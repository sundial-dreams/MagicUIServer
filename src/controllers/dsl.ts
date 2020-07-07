import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import {ObjectId} from 'mongodb';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import DslFolder, { DslFolderRepository } from '../model/mysql/DslFolder';
import DslFile, { DslFileRepository } from '../model/mysql/DslFile';
import { DslFileCollection } from '../model/mongodb/DslFileCollection';
import { md5 } from '../utils/md5';

export default class DSLEditorController extends Controller {
  static baseUrl = '/dsl_editor';
  static routerMap = new Map();

  private dslFolderRep = getCustomRepository(DslFolderRepository);
  private dslFileRep = getCustomRepository(DslFileRepository);
  private dslFileCol = new DslFileCollection();

  @DefineRouter.get('/dsl_files') async handleDslFiles(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const folderResult = await this.dslFolderRep.find({own: email});
      const fileResult = await this.dslFileRep.find({own: email});
      res.json({
        err: false,
        folders: folderResult,
        files: fileResult
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @DefineRouter.get('/dsl_code') async handleGetDslCode(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const fileId = req.query.fileId as string;
      const [dsl] = await this.dslFileCol.find({ _id: new ObjectId(fileId), own: email });
      if (dsl) {
        res.json({
          err: false,
          dsl: dsl
        })
        return ;
      }
      res.json({
        err: true,
        msg: 'dsl not found'
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  @DefineRouter.post('/create_dsl_file') async handleCreateDslFile(req: Request, res: Response) {
    try {
      const email = req.body.email as string;
      const folder = req.body.folder as string;
      const type = req.body.fileType as 'folder' | 'file';
      const name = req.body.filename as string;
      const createTime = + Date.now();
      const id = md5(email + Date.now() + Math.floor(Math.random() * 1000));

      if (type === 'folder') {
        const dslFolder = new DslFolder({
          id,
          name,
          createTime,
          folder,
          own: email
        });
        await this.dslFolderRep.save(dslFolder);
        res.json({
          err: false,
          id: dslFolder.id,
          fileId: dslFolder.id
        });
        return;
      }

      if (type === 'file') {
        const result = await this.dslFileCol.insert([{ name, own: email, createTime, folder, code: '' }]);
        const dslFile = new DslFile({
          id,
          name,
          createTime,
          folder,
          own: email,
          fileId: result.insertedIds[0] + ''
        });
        await this.dslFileRep.save(dslFile);
        res.json({
          err: false,
          id: dslFile.id,
          fileId: result.insertedIds[0] + ''
        });
        return;
      }
      res.json({
        err: true,
        msg: 'type error!'
      })
    } catch (e) {

      throw new Error(e);
    }
  }

  @DefineRouter.post('/rename_file') async handleRenameDslFile(req: Request, res: Response) {
    try {
      const email = req.body.email as string;
      const id = req.body.id as string;
      const name = req.body.name as string;
      const fileType = req.body.fileType as 'folder' | 'file';
      const fileId = req.body.fileId as string;

      if (fileType === 'folder') {
        await this.dslFolderRep.update({ own: email, id }, { name });
        res.json({
          err: false,
        })
        return ;
      }

      if (fileType === 'file') {
        await this.dslFileRep.update({own: email, id}, { name });
        await this.dslFileCol.update({ owm: email, _id: new ObjectId(fileId) }, { name });
        res.json({
          err: false
        })
      }

    } catch (e) {

      throw new Error(e);
    }
  }

  @DefineRouter.post('/remove_dsl_file') async handleRemoveDslFile(req: Request, res: Response) {
    try {
      const id = req.body.id as string;
      const fileId = req.body.fileId as string;
      const email = req.body.email as string;
      const fileType = req.body.fileType;
      if (fileType === 'file') {
        await this.dslFileRep.delete({id, own: email});
        await this.dslFileCol.remove({_id: new ObjectId(fileId), own: email});
        res.json({
          err: false,
        });
        return;
      }
      if (fileType === 'folder') {
        res.json({
          err: false
        });
        return;
      }
      res.json({
        err: true
      })
    }catch (e) {
      throw new Error(e);
    }
  }

  @DefineRouter.post('/save_dsl_code') async handleSaveDslCode(req: Request, res: Response) {
    try {
      const fileId = req.body.fileId as string;
      const email = req.body.email as string;
      const code = req.body.code as string;
      console.log(code, fileId, email);
      await this.dslFileCol.findAndUpdate({own: email, _id: new ObjectId(fileId)}, {code});

      res.json({
        err: false,
        code: code
      })
    } catch (e) {
      throw new Error(e);
    }

  }

  @DefineRouter.post('/save_all_dsl_code') async handleSaveAllDslCode(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const files = JSON.parse(req.body.files) as { fileId: string, code: string }[];

      for (let file of files) {

      }
      res.json({
        err: false,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

