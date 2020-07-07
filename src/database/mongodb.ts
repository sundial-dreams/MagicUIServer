import { FilterQuery, MongoClient, ObjectId } from 'mongodb';
import { EventEmitter } from 'events';

export const MONGODB_URI = 'mongodb://localhost:27017';

export const DATABASE_NAME = 'auto_ui';


export class MongoDB extends EventEmitter {
  static instance: MongoDB | null = null;

  static getInstance() {
    return MongoDB.instance ? MongoDB.instance :
      (MongoDB.instance = new MongoDB());
  }

  constructor() {
    super();
  }

  async connect() {
    return await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  }

  async find(col: string, args: FilterQuery<any>) {
    try {
      const client = await this.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(col);
      return await collection.find(args).toArray().finally(() => client.close());
    } catch (e) {
      throw new Error(e);
    }
  }

  async insert(col: string, data: any[]) {
    try {
      const client = await this.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(col);
      return await collection.insertMany(data).finally(() => client.close());
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(col: string, oldData: any, newData: any) {
    try {
      const client = await this.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(col);
      return await collection.updateOne(oldData, { $set: newData }).finally(() => client.close());
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(col: string, args: FilterQuery<any>) {
    try {
      const client = await this.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(col);
      return await collection.deleteOne(args).finally(() => client.close());
    } catch (e) {
      throw new Error(e);
    }
  }

  async client() {
    return await this.connect();
  }

  async updateById(col: string, id: string, updated: object) {
    try {
      const client = await this.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(col);
      return await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updated });
    } catch (e) {
      throw new Error(e);

    }
  }

  async findAndUpdate(col: string, query: FilterQuery<any>, updated: any) {
    try {
      const client = await this.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(col);
      return await collection.findOneAndUpdate(query, { $set: updated });
    } catch (e) {
      throw new Error(e);

    }
  }
}


export default MongoDB.getInstance();