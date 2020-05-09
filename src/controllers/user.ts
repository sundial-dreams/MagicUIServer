import express, { Request, Router, Response } from 'express';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import { getCustomRepository } from 'typeorm';
import { User, UserRepository } from '../model/user';



export default class UserController extends Controller {
  static readonly baseUrl: string = '/user';
  static readonly routerMap = new Map();
  private readonly userRepository = getCustomRepository(UserRepository);

  constructor() {
    super();

  }

  @DefineRouter.post('/login/user_email') async handleUserEmail(req: Request, res: Response) {
    const email = req.body.email as string;
    console.log('email:=', email);
    const result = await this.userRepository.find({ email });
    if (result.length > 0) {
      const [user] = result;
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
    const result = await this.userRepository.find({ email });
    if (result.length > 0) {
      const [user] = result;
      console.log(user);
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
      const { email, password, avatar, nickname, sex, age, name } = req.body;
      const user = new User();
      user.email = email;
      user.avatar = avatar;
      user.password = password;
      user.age = age;
      user.sex = sex;
      user.nickname = nickname;
      user.name = name;

      let r = await this.userRepository.save(user);
      res.json({
        err: false,
        user: r
      });
    } catch (e) {
      throw new Error(e)
    }
  }
}
