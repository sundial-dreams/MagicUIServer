import express, { Request, Response } from 'express';
import Middleware, { IMiddlewareCallback } from '../core/middleware';

export default class LogMiddleware extends Middleware {

  async exec(req: Request, res: Response, next: () => void): Promise<void> {
    console.log('logging: ', req.method, req.url);

    next();
  }
}


export const logging: IMiddlewareCallback = (req, res, next) => {
  console.log('logging: ', req.method, req.url, req.body);
  next();
};
