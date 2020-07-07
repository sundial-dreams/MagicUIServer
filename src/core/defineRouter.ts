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
    };
  }
}
