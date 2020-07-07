import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import { WebGLPage, WebglPageRepository } from '../model/mysql/WebGLPage';
import { md5 } from '../utils/md5';
import { IWebGLPage, WebGLPageCollection } from '../model/mongodb/WebGLPageCollection';

export default class WebGLEditorController extends Controller {
  static baseUrl = '/ui_editor';
  static readonly routerMap = new Map();

  private readonly pageRep = getCustomRepository(WebglPageRepository);
  private readonly pageCol = new WebGLPageCollection();

  constructor() {
    super();

  }

  @DefineRouter.get('/webgl_page') async handleUIPage(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      let result = await this.pageRep.find({ own: email });
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
      let result = await this.pageCol.find({ _id: new ObjectId(pageId) });
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
      let result = await this.pageCol.insert([onePage]);
      const webglPage = new WebGLPage({
        own: email,
        createTime,
        name,
        description,
        id: md5(email + Date.now() + Math.floor(Math.random() * 1000)),
        pageId: '' + result.insertedIds[0]
      });

      await this.pageRep.save(webglPage);

      res.json({
        err: false,
        pageId: webglPage.pageId,
        id: webglPage.id,
      });

    } catch (e) {
      res.json({ err: true, msg: 'api error!' });
      throw new Error(e);
    }
  }

  @DefineRouter.get('/all_page') async handleAllPage(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const result = await this.pageRep.find({own: email});

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

  @DefineRouter.get('/get_page') async handleGetPage(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const pageId = req.query.pageId as string;
      const result = await this.pageCol.find({_id: new ObjectId(pageId), own: email});
      if (result.length) {
        res.json({
          err: false,
          page: result[0]
        });
        return;
      }
      res.json({
        err: true,
        msg: 'page not found!'
      })
    } catch (e) {

    }
  }

  @DefineRouter.post('/update_page') async handleUpdatePage(req: Request, res: Response) {
    try {
      const pageId = req.body.pageId as string;
      const email = req.body.email as string;
      const updatedPage = JSON.parse(req.body.updatedPage as string);
      const result = await this.pageCol.findAndUpdate({_id: new ObjectId(pageId), own: email}, {page: updatedPage});
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
    try {
      const email = req.body.email as string;
      const id = req.body.id as string;
      console.log(email, id);
      const [page] = await this.pageRep.find({ own: email, id });
      console.log(page);
      if (page) {
        await this.pageRep.remove(page);
        await this.pageCol.remove({ _id: new ObjectId(page.pageId) });
        const [onePage] = await this.pageRep.find({ own: email });
        res.json({
          err: false,
          id: onePage.id,
          name: onePage.name,
          pageId: onePage.pageId
        });
        return;
      }
      res.json({
        err: true,
        msg: 'page not found!'
      })
    } catch (e) {

    }
  }
  @DefineRouter.post('/rename_page') async handleRenamePage(req: Request, res: Response) {
    try {
      const email = req.body.email as string;
      const id = req.body.id as string;
      const name = req.body.name as string;
      console.log(email, id, name);
      const [page] = await this.pageRep.find({own: email, id});
      if (page) {
        page.name = name;
        await this.pageRep.save(page);
        await this.pageCol.findAndUpdate({ _id: new ObjectId(page.id), own: email },  {name})
        res.json({
          err: false,
          newName: name
        });
        return;
      }
      res.json({
        err: true,
        msg: 'page not found!'
      })
    } catch (e) {
      res.json({
        err: true,
        msg: 'api error!'
      })
    }
  }
}
