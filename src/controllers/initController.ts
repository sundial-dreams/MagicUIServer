import express, {Request, Response, Router} from 'express';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';

export default class InitController extends Controller {
  static baseUrl: string = '/';
  static routers: Router = express.Router();

  @DefineRouter.get('/userLogin') async handleUserLogin(req: Request, res: Response) {
    console.log('eee');
    res.send('hhhh');
  }

  @DefineRouter.get('/userLogout') handleUserLogout(req: Request, res: Response) {
    console.log('hahah');
    res.json({
      data: 'hahah',
      logout: 'some'
    });
  }

}
