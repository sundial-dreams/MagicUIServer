import { MongoDB } from '../../database/mongodb';
import { FilterQuery } from 'mongodb';

export class Collection<T extends any> {
  protected collection: string;
  protected instance: MongoDB;

  constructor() {
    this.instance = MongoDB.getInstance();
    this.collection = '';
  }

  find(args: FilterQuery<T>): Promise<T[] | any[]> {
    return this.instance.find(this.collection, args);
  }

  insert(data: (T | any)[]): Promise<any> {
    return this.instance.insert(this.collection, data);
  }

  update(oldData: T | any, newData: T | any): Promise<any> {
    return this.instance.update(this.collection, oldData, newData);
  }

  remove(args: FilterQuery<T | any>): Promise<any> {
    return this.instance.remove(this.collection, args);
  }

  client(): Promise<any> {
    return this.instance.connect();
  }

  updateById(id: string, updated: T | any): Promise<any> {
    return this.instance.updateById(this.collection, id, updated);
  }

  findAndUpdate(query: FilterQuery<T | any>, updated: T | any): Promise<any> {
    return this.instance.findAndUpdate(this.collection, query, updated);
  }
}



