import express, {Request, Response, Router} from 'express';
import Controller, {RouterDefine} from '../core/controller';

export default class InitController extends Controller {
    static path: string = '/';
    static routers: Router = express.Router();

    @RouterDefine.get('/userLogin') handleUserLogin(req: Request, res: Response) {
        console.log('eee');
        res.send('hhhh');
    }

    @RouterDefine.get('/userLogout') handleUserLogout(req: Request, res: Response) {
        console.log('hahah');
        res.json({
            data: 'hahah',
            logout: 'some'
        })
    }

}
