import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Router } from 'express';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import MongoDB, { DATABASE_NAME } from '../database/mongodb';
import { WebglPage, WebglPageRepository } from '../model/webglPage';
import { IWebGLPage } from '../model/mongodb';

export default class WebGLEditorController extends Controller {
  static baseUrl = '/ui_editor';
  static readonly routerMap = new Map();
  private readonly webglPageRepository = getCustomRepository(WebglPageRepository);

  constructor() {
    super();

  }

  @DefineRouter.get('/webgl_page') async handleUIPage(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      let result = await this.webglPageRepository.find({ own: email });
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

  @DefineRouter.get('/current_page') async handleCurrentPage(req: Request, res: Response) {
    try {
      const pageId = req.query.pageId as string;
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

  @DefineRouter.post('/create_page') async handleCreatePage(req: Request, res: Response) {
    try {
      const email = req.body.email as string;
      const name = req.body.name as string;
      const description = req.body.description as string;
      const createTime = +Date.now();

      const onePage = { own: email, createTime, page: null, name, description } as IWebGLPage;

      let result = await MongoDB.insert('webgl_page', [onePage]);
      const webglPage = new WebglPage();
      webglPage.own = email;
      webglPage.createTime = createTime;
      webglPage.name = name;
      webglPage.description = description;
      webglPage.id = '' + result.insertedIds[0];
      await this.webglPageRepository.save(webglPage);
      res.json({
        err: false,
        pageId: webglPage.id
      });

    } catch (e) {

      res.json({ err: true, msg: 'api error!' });
      throw new Error(e);
    }
  }

  @DefineRouter.get('/all_page') async handleAllPage(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const result = <IWebGLPage[]> await MongoDB.find('webgl_page', {own: email});
      res.json({
        err: false,
        pages: result,
      });
    } catch (e) {
      res.json({
        err: true,
        msg: 'api error!'
      })
      throw new Error(e);
    }
  }

  @DefineRouter.post('/update_page') async handleUpdatePage(req: Request, res: Response) {
    try {
      const pageId = req.body.pageId as string;
      const updatedPage = JSON.parse(req.body.updatedPage as string);
      console.log(pageId);
      const client = await MongoDB.client();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection('webgl_page');
      const result = await collection.findOneAndUpdate({_id: new ObjectId(pageId)}, {$set: {page: updatedPage}}).finally(() => client.close());
      res.json({
        err: !result.ok
      });

    } catch (e) {
      res.json({
        err: true,
        msg: 'api error!'
      })
      throw new Error(e);

    }
  }
  @DefineRouter.post('/delete_page') async handleDeletePage(req: Request, res: Response) {

  }
  @DefineRouter.post('/rename_page') async handleRenamePage(req: Request, res: Response) {

  }
}
