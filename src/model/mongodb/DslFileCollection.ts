import { Collection } from './index';

export interface IDslFile {
  name: string,
  folder: string,
  createTime?: number,
  code: string,
  own: string
}

export class DslFileCollection extends Collection<IDslFile> {
  constructor() {
    super();
    this.collection = 'dsl_file';
  }
}
