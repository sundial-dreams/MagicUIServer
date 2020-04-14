import express, {Request, Response, Router} from 'express';

export default class Controller {
  static path: string = '/';
  static routers: Router = express.Router();
}

export interface IHandleCallback {
  (req: Request, res: Response): void;
}

export interface IAsyncHandleCallback {
  (req: Request, res: Response): Promise<void>;
}

export type THandleCallback = (req: Request, res: Response) => void;

export type TAsyncHandleCallback = (req: Request, res: Response) => Promise<void>;

export interface IController {
  path: string;
  routers: Router;
}


export enum Method {
  GET,
  POST,
  ALL
}

export class RouterDefine {

  static get(url: string) {
    return RouterDefine.handle(url, Method.GET);
  }

  static post(url: string) {
    return RouterDefine.handle(url, Method.POST);
  }

  static handle(url: string, method: Method = Method.ALL) {
    return function (target: any, prop: string) {
      const {routers} = target.constructor as IController;
      const handle = (target[prop] as IAsyncHandleCallback | IHandleCallback).bind(target);

      switch (method) {
        case Method.ALL: {
          routers.all(url, handle);
          return;
        }
        case Method.GET: {
          routers.get(url, handle);
          return;
        }
        case Method.POST: {
          routers.post(url, handle);
          return;
        }
      }
    };
  }
}
