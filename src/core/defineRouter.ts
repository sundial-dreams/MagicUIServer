import {IAsyncHandleCallback, IController, IHandleCallback} from './controller';
import { Router } from 'express';

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
    url = url.startsWith('/') ? url : `/${url}`;
    return function (target: any, prop: string) {
      const {routerMap} = target.constructor as IController;
      const handle = (target[prop] as IAsyncHandleCallback | IHandleCallback);
      routerMap.set(url, [method, handle]);
      // switch (method) {
      //   case Method.ALL: {
      //     routers.all(url, handle);
      //     return;
      //   }
      //   case Method.GET: {
      //     routers.get(url, handle);
      //     return;
      //   }
      //   case Method.POST: {
      //     routers.post(url, handle);
      //     return;
      //   }
      // }
    };
  }
}
//
// const DefineRouter: Function | any = (params: {baseUrl: string}) => {
//   return function (target: any) {
//     target.baseUrl = params.baseUrl;
//     target.routers = Router();
//   }
// }
//
// DefineRouter.get = function(url: string) {
//   return DefineRouter.handle(url, Method.GET);
// }
//
// DefineRouter.post = function(url: string) {
//   return DefineRouter.handle(url, Method.POST);
// }
//
// DefineRouter.handle = function(url: string, method: Method = Method.ALL) {
//   return function (target: any, prop: string) {
//     const {routers} = target.constructor as IController;
//     const handle = (target[prop] as IAsyncHandleCallback | IHandleCallback).bind(target);
//     switch (method) {
//       case Method.ALL: {
//         routers.all(url, handle);
//         return;
//       }
//       case Method.GET: {
//         routers.get(url, handle);
//         return;
//       }
//       case Method.POST: {
//         routers.post(url, handle);
//         return;
//       }
//     }
//   };
// }
//
// export default DefineRouter;
