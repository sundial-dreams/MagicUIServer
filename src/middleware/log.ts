import express, { Request, Response } from 'express';
import Middleware, { IMiddlewareCallback } from '../core/middleware';

export default class LogMiddleware extends Middleware {

  exec(req: Request, res: Response, next: () => void): void {
    console.log('logging: ', req.method, req.url);
    next();
  }
}
