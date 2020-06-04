import { DATABASE_NAME, MongoDB } from '../database/mongodb';
import { FilterQuery, ObjectId } from 'mongodb';

export interface IWebGLPage {
  createTime: number;
  own: string;
  name: string;
  description: string;
  page?: IWebGLComponent | null
}

export interface IWebGLComponent {
  type: string,
  name: string,
  props: {
    position: { x: number, y: number },
    size: {
      width: number,
      height: number
    },
    background?: {
      fill: string,
      opacity: number
    },
    border?: {
      width: number,
      radius: number,
      fill: string
    },
    shadow?: {
      offsetX: number,
      offsetY: number,
      blur: number,
      fill: string
    },
    text?: {
      text: string,
      fill: string
    },
    image?: {
      image: string
    }
  },
  children: IWebGLComponent[],
}


export interface IFolder {
  type: string,
  name: string,
  id: string,
  folder: string,
  createTime?: number,
  files: (IFolder | IFile)[]
}

export interface IFile {
  type: string,
  name: string,
  id: string,
  folder: string,
  createTime?: number,
  code: string
}

class Collection<T> {
  protected collection: string;
  protected instance: MongoDB;

  constructor() {
    this.instance = MongoDB.getInstance();
    this.collection = '';
  }

  find(args: FilterQuery<any>): Promise<T[] | any[]> {
    return this.instance.find(this.collection, args);
  }

  insert(data: any[]): Promise<T | any> {
    return this.instance.insert(this.collection, data);
  }

  update(oldData: any, newData: any): Promise<any> {
    return this.instance.update(this.collection, oldData, newData);
  }

  remove(args: FilterQuery<any>): Promise<any> {
    return this.instance.remove(this.collection, args);
  }

  client(): Promise<any> {
    return this.instance.connect();
  }

  updateById(col: string, id: string, updated: object): Promise<any> {
    return this.instance.updateById(this.collection, id, updated);
  }

  findAndUpdate(col: string, query: FilterQuery<any>, updated: any): Promise<any> {
    return this.instance.findAndUpdate(this.collection, query, updated);
  }
}

export class WebGLPageCollection extends Collection {
  constructor() {
    super();
    this.collection = 'webgl_page';
  }
}

export class DslFileCollection extends Collection {
  constructor() {
    super();
    this.collection = 'dsl_file';
  }
}

export class SettingsCollection extends Collection {
  constructor() {
    super();
    this.collection = 'settings';
  }
}
