import express, { Request, Router, Response } from 'express';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import { getCustomRepository } from 'typeorm';
import { User, UserRepository } from '../model/mysql/User';
import { UserAvatarRepository } from '../model/mysql/UserAvatar';
import { SettingsCollection } from '../model/mongodb/SettingsCollection';



export default class UserController extends Controller {
  static readonly baseUrl: string = '/user';
  static readonly routerMap = new Map();
  private readonly userRep = getCustomRepository(UserRepository);
  private readonly userAvatarRep = getCustomRepository(UserAvatarRepository);
  private readonly settingsCol = new SettingsCollection();

  constructor() {
    super();
  }

  @DefineRouter.post('/login/user_email') async handleUserEmail(req: Request, res: Response) {
    const email = req.body.email as string;
    console.log('email:=', email);
    const [user] = await this.userRep.find({ email });
    if (user) {
      res.json({
        err: false,
        avatar: user.avatar,
        nickname: user.nickname,
        email: user.email
      });
    }
    res.json({
      err: true,
      msg: 'email not found'
    });
  }


  @DefineRouter.post('/login/user_password') async handleUserPassword(req: Request, res: Response) {
    const email = req.body.email as string;
    const password = req.body.password as string;
    const [user] = await this.userRep.find({ email });
    if (user) {
      if (user.password === password) {
        res.json({
          err: false,
          email,
          password,
          avatar: user.avatar,
          nickname: user.nickname
        });
        return;
      }
    }
    res.json({
      err: true,
      msg: 'password or email error!'
    });
  };

  @DefineRouter.post('/user_login') async handleUserLogin(req: Request, res: Response) {
    res.json({
      ok: '',
      data: 'data'
    });
  }

  @DefineRouter.post('/user_logout') async handleUserLogout(req: Request, res: Response) {

    res.json({
      ok: ''
    });
  }


  @DefineRouter.post('/register/create_user') async handleRegisterUser(req: Request, res: Response) {
    try {
      const { email, password, avatar, nickname } = req.body;
      let u = await this.userRep.find({ email });
      if (u.length) {
        res.json({
          err: true,
          msg: 'email has be register'
        });
        return;
      }

      const user = new User({
        email,
        avatar,
        password,
        age: 20,
        sex: 'male',
        nickname,
        name: ''
      });

      let r = await this.userRep.save(user);
      await this.settingsCol.insert([{ own: user.email, theme: 'dark', autoSave: true }])
      res.json({
        err: false,
        user: r
      });
    } catch (e) {
      throw new Error(e)
    }
  }
  @DefineRouter.post('/modify/modify_user') async handleModifyUser(req: Request, res: Response) {
    try {
      const { email, password, nickname, avatar } = req.body;
      console.log(email, password, nickname, avatar);
      const [user] = await this.userRep.find({ email });
      if (user) {
        await this.userRep.update({email}, { password, nickname, avatar });
        res.json({
          err: false
        })
        return ;
      }
      res.json({
        err: true,
        msg: 'user not found!'
      })
    } catch (e) {

    }
  }

  @DefineRouter.get('/get_all_avatar') async handleAllAvatar(req: Request, res: Response) {
    const result = await this.userAvatarRep.find({});
    res.json({
      err: false,
      avatars: result
    });
  }

  @DefineRouter.get('/user_settings') async handleGetSettings(req: Request, res: Response) {
    const email = req.query.email as string;
    const [settings] = await this.settingsCol.find({ own: email });
    if (settings) {
      res.json({
        err: false,
        settings
      })
    }
    res.json({
      err: true,
      msg: 'settings not found!'
    })
  }

  @DefineRouter.post('/modify/user_settings') async handleModifySettings(req: Request, res: Response) {
    const email = req.body.email as string;
    const settings = JSON.parse(req.body.settings)
    await this.settingsCol.findAndUpdate({ own: email }, settings);
    res.json({
      err: false,
    });
  }
}
