import express, { Request, Router, Response } from 'express';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../model/user';



export default class LoginController extends Controller {
  static readonly baseUrl: string = '/login';
  static readonly routerMap = new Map();
  static userRepository: UserRepository;

  constructor() {
    super();
    LoginController.userRepository = getCustomRepository(UserRepository);

  }

  @DefineRouter.post('/user_email') async handleUserEmail(req: Request, res: Response) {
    console.log('login this', this);
    const email = req.body.email as string;
    const result = await LoginController.userRepository.find({ email });
    if (result.length > 0) {
      const [user] = result;
      res.json({
        err: false,
        avatar: user.avatar,
        email
      });
    }
    res.json({
      err: true,
      msg: 'email not found'
    });
  }


  @DefineRouter.post('/user_password') async handleUserPassword(req: Request, res: Response) {
    const email = req.body.email as string;
    const password = req.body.password as string;
    const result = await LoginController.userRepository.find({ email });
    if (result.length > 0) {
      const [user] = result;
      if (user.password === password) {
        res.json({
          err: false,
          email,
          password,
          avatar: user.avatar
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
    console.log(this);
    res.json({
      ok: '',
      data: 'data'
    });
  }

  @DefineRouter.post('/user_logout')
  async handleUserLogout(req: Request, res: Response) {

    res.json({
      ok: ''
    });
  }
}
