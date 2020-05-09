import express, { Request, Response } from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import App from './core';
import MongoDB from './database/mongodb';
import MySQL from './database/mysql';
import { User } from './model/user';
import { WebglPage } from './model/webglPage';

import LogMiddleware from './middleware/log';
import UserController from './controllers/user';
import WebGLEditorController from './controllers/webglEditor';
import DSLEditorController from './controllers/dslEditor';
import DslFiles from './model/dslFiles';
import SocketService from './socket';


const entities: Function[] = [User, WebglPage, DslFiles];


async function main() {
  try {
    // await MongoDB.connect();
    await MySQL.connect(entities);

    const app = new App({
      controllers: [
        new UserController(),
        new WebGLEditorController(),
        new DSLEditorController()
      ],
      middleware: [
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



