import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Router } from 'express';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import MongoDB from '../database/mongodb';
import { WebglPage, WebglPageRepository } from '../model/webglPage';
import { IWebGLPage } from '../model/mongodb';

export default class WebGLEditorController extends Controller {
  static baseUrl = '/ui_editor';
  static readonly routerMap = new Map();
  // static routers = Router();
  static webglPageRepository: WebglPageRepository;

  constructor() {
    super();
    WebGLEditorController.webglPageRepository = getCustomRepository(WebglPageRepository);

  }

  @DefineRouter.get('/webgl_page')
  async handleUIPage(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      let result = await WebGLEditorController.webglPageRepository.find({ own: email });
      res.json({
        err: false,
        pages: result
      });
      return;
    } catch (e) {
      res.json({
        err: true,
        msg: 'api error!'
      });
      throw new Error(e);
    }
  }

  @DefineRouter.get('/current_page')
  async handleCurrentPage(req: Request, res: Response) {
    try {
      const pageId = req.query.pageId as string;
      console.log(req.query);
      console.log(pageId);
      let result = await MongoDB.find('webgl_page', { _id: new ObjectId(pageId) });
      if (result.length > 0) {
        const [curPage] = result;
        res.json({
          err: false,
          curPage
        });
        return;
      }
      res.json({
        err: true,
        msg: 'page not found!'
      });
    } catch (e) {
      res.json({ err: true, msg: 'api error!' });
      throw new Error(e);
    }
  }

  @DefineRouter.post('/create_page')
  async handleCreatePage(req: Request, res: Response) {
    try {
      const email = req.body.email as string;
      const name = req.body.name as string;
      const description = req.body.description as string;
      const createTime = +Date.now();

      const onePage = { own: email, createTime, page: null } as IWebGLPage;

      let result = await MongoDB.insert('webgl_page', [onePage]);
      const webglPage = new WebglPage();
      webglPage.own = email;
      webglPage.createTime = createTime;
      webglPage.name = name;
      webglPage.description = description;
      webglPage.id = '' + result.insertedIds[0];
      await WebGLEditorController.webglPageRepository.save(webglPage);
      res.json({
        err: false,
        pageId: webglPage.id
      });

    } catch (e) {

      res.json({ err: true, msg: 'api error!' });
      throw new Error(e);
    }
  }

  @DefineRouter.post('/update_page')
  async handleUpdatePage(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }
}
