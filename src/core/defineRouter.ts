import {IAsyncHandleCallback, IController, IHandleCallback} from './controller';

export enum Method {
  GET,
  POST,
  ALL
}

export default class DefineRouter {

  static get(url: string) {
    return DefineRouter.handle(url, Method.GET);
  }

  static post(url: string) {
    return DefineRouter.handle(url, Method.POST);
  }

  static handle(url: string, method: Method = Method.ALL) {
    return function (target: any, prop: string) {
      const {routers} = target.constructor as IController;
      console.log('routers: ', routers);
      const handle = (target[prop] as IAsyncHandleCallback | IHandleCallback).bind(target);
      console.log('handle: ', handle);
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
/*
export function DefineRouter(params: { baseUrl: string } = { baseUrl: '/' }) {
  return function <T extends {new(...args: any[]): {}}> (constructor: T) {
    console.log('constructor = ', constructor);
    // (constructor as any).baseUrl = '/';
    // (constructor as any).routers = express.Router();
    // return constructor;
    return class extends constructor {
      static readonly baseUrl: string = params.baseUrl;
      static readonly routers: Router = express.Router();
    }
  }
}
 */
