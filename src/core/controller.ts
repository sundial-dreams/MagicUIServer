import express, {Request, Response, Router} from 'express';

export default class Controller {
  static baseUrl: string = '/';
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
  baseUrl: string;
  routers: Router;
}


