import express, {Request, Response, Router} from 'express';
import Controller, {Method, RouterDefine} from '../core/controller';


export default class SecondController extends Controller {
  static path: string = '/second';
  static routers: Router = express.Router();

  @RouterDefine.handle('/') handle(req: Request, res: Response) {
    res.send('second');
  }

  @RouterDefine.handle('/func', Method.GET) handle2(req: Request, res: Response) {
    res.json({
      data: 'func handle 2'
    });
  }
}
