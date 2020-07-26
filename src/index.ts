import express, { Request, Response } from 'express';
import path from 'path';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import App from './core';
import MongoDB from './database/mongodb';
import MySQL from './database/mysql';
import { User } from './model/mysql/User';
import { WebGLPage } from './model/mysql/WebGLPage';

import LogMiddleware from './middleware/log';
import UserController from './controllers/user';
import WebGLEditorController from './controllers/webgl';
import DSLEditorController from './controllers/dsl';
import DslFolder from './model/mysql/DslFolder';
import SocketService from './socket';
import UserAvatar from './model/mysql/UserAvatar';
import DslFile from './model/mysql/DslFile';
import exp from 'constants';


const entities: Function[] = [User, WebGLPage, DslFolder, UserAvatar, DslFile];


async function main() {
  try {
    await MongoDB.connect();
    await MySQL.connect(entities);

    const options = {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html', 'ts', 'png'],
      index: false,
      maxAge: '1d',
      redirect: false,
      setHeaders: function (res: Response, path: string, stat: any) {
        res.set('x-timestamp', Date.now() + '')
      }
    }

    const app = new App({
      controllers: [
        new UserController(),
        new WebGLEditorController(),
        new DSLEditorController()
      ],
      middleware: [
        express.static('resources', options),
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json(),
        new LogMiddleware()
      ]
    });
    const socket = new SocketService();

    socket.listen();
    app.listen(8000, () => console.log('listening 8000'));
  } catch (e) {
    throw new Error(e);
  }
}


main().catch(console.error);



