import express, { Request, Response } from 'express';
import Middleware, { IMiddlewareCallback } from '../core/middleware';
import {IAsyncHandleCallback, IHandleCallback} from '../core/controller';

export default class LogMiddleware extends Middleware {

  async exec(req: Request, res: Response, next: () => void): Promise<void> {
    console.log('logging: ', req.method, req.url);

    next();
  }
}

export const next = (handle: IHandleCallback | IAsyncHandleCallback) => {
  return async (req: Request, res: Response, next: () => void) => {
    await handle(req, res);
    next();
  }
};

export const logging: IMiddlewareCallback = (req, res, next) => {
  console.log('logging: ', req.method, req.url, req.body);
  next();
};

export const logging2 = next((req, res) => {
  console.log('logging2: ');
});
