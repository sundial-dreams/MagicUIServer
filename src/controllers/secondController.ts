import express, {Request, Response, Router} from 'express';
import Controller from '../core/controller';
import DefineRouter, {Method, RouterDefined} from '../core/defineRouter';

export default class SecondController extends Controller {
  static baseUrl: string = '/second';
  static routers: Router = express.Router();

  @DefineRouter.handle('/') handle(req: Request, res: Response) {
    res.send('second');
  }

  @DefineRouter.handle('/func', Method.GET) handle2(req: Request, res: Response) {
    res.json({
      data: 'func handle 2'
    });
  }
}
