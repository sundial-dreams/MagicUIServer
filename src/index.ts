import express, { Request, Response } from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import App from './core';
import MongoDB from './database/mongodb';
import MySQL from './database/mysql';
import { User } from './model/user';
import { WebglPage } from './model/webglPage';

import LogMiddleware from './middleware/log';
import LoginController from './controllers/login';
import WebGLEditorController from './controllers/webglEditor';


const entities: Function[] = [User, WebglPage];


async function main() {
  try {
    await MongoDB.connect();
    await MySQL.connect(entities);

    const app = new App({
      controllers: [
        new LoginController(),
        new WebGLEditorController()
      ],
      middleware: [
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json(),
        new LogMiddleware()
      ]
    });

    app.listen(8000, () => console.log('listening 8000'));
  } catch (e) {
    throw new Error(e);
  }
}


main().catch(console.error);



