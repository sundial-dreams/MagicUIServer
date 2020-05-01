import express, {Request, Response, Router} from 'express';
import { Method } from './defineRouter';

export default class Controller {
  static readonly baseUrl: string = '/';
  static readonly routerMap: TRouterMap = new Map();
}

export type TRouterMap = Map<string, [Method, IHandleCallback | IAsyncHandleCallback]>;

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
  routerMap: TRouterMap
}


