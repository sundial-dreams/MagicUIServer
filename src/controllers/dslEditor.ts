import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import Controller from '../core/controller';
import DefineRouter from '../core/defineRouter';
import MongoDB from '../database/mongodb';
import { IFile, IFolder } from '../model/mongodb';
import DslFiles, { DslFilesRepository, FileType } from '../model/dslFiles';

export default class DSLEditorController extends Controller {
  static baseUrl = '/dsl_editor';
  static routerMap = new Map();

  private dslFileRepository = getCustomRepository(DslFilesRepository);

  @DefineRouter.get('/dsl_files') async handleDslFiles(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const result = await this.dslFileRepository.find({own: email});
      res.json({
        err: false,
        files: result
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @DefineRouter.post('/create_dsl_file') async handleCreateDslFile(req: Request, res: Response) {
    try {
      console.log('create dsl');
      const email = req.body.email as string;
      const folder = req.body.folder as string;
      const type = req.body.fileType as FileType;
      const name = req.body.filename as string;
      console.log(email, folder);
      const dsl = new DslFiles();
      dsl.id = type + Date.now();
      dsl.own = email;
      dsl.fileType = type;
      dsl.filename = name;
      dsl.code = 'window { a: sss; b: ccc; }';
      dsl.folder = folder;

      let r = await this.dslFileRepository.save(dsl);

      res.json({
        err: false,
        id: r.id
      });
    } catch (e) {

      throw new Error(e);
    }
  }

  @DefineRouter.post('/rename_dsl_file')
  async handleRenameDslFile(req: Request, res: Response) {
    try {

    } catch (e) {

      throw new Error(e);
    }
  }

  @DefineRouter.post('/remove_dsl_file') async handleRemoveDslFile(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const email = req.body.email;
      const fileType = req.body.fileType;
      if (fileType === 'file') {
        let r = await this.dslFileRepository.delete({id, own: email});
        res.json({
          err: false,
        });
        return;
      }
      if (fileType === 'folder') {
        res.json({
          err: false
        })
      }
    }catch (e) {

    }
  }

  @DefineRouter.post('/save_dsl_code') async handleSaveDslCode(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const email = req.body.email;
      const fileType = req.body.fileType;
      const code = req.body.code;

      await this.dslFileRepository.update({id: id, own: email}, { code });
      res.json({
        err: false,
        code: code
      })
    } catch (e) {

    }

  }

  @DefineRouter.post('/save_all_dsl_code') async handleSaveAllDslCode  (req: Request, res: Response) {
    try {
      const email = req.body.email;
      const files = JSON.parse(req.body.files) as { id: string, code: string }[];
      console.log('save all dsl code', email, files);

      for (let file of files) {
        await this.dslFileRepository.update({ id: file.id, own: email }, { code: file.code });
      }
      res.json({
        err: false,
      });
    } catch (e) {
      throw new Error(e);
    }
  }


}

