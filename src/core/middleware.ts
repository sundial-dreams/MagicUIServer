import express, {Request, Response} from 'express';

export interface IMiddlewareCallback {
  (req: Request, res: Response, next: () => void): void;
}

export default abstract class Middleware {
  abstract async exec(req: Request, res: Response, next: () => void): Promise<void>;
}

