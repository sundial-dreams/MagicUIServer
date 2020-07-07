import SocketIO  from 'socket.io';
import { ObjectId } from 'mongodb';
import { EventEmitter } from 'events';
import MongoDB from '../database/mongodb';
import { WebGLPageCollection } from '../model/mongodb/WebGLPageCollection';

const port = 3000;

export default class SocketService extends EventEmitter {
  private readonly socket: SocketIO.Server;
  private readonly webglCol = new WebGLPageCollection();
  constructor() {
    super();
    this.socket = SocketIO();
  }

  autoSaveWebGLPage(client: SocketIO.Socket) {
    client.on('auto-save-webgl-page', async (args: any) => {
      try {
        const pageId = args.pageId;
        const page = args.page;
        await this.webglCol.findAndUpdate({ _id: new ObjectId(pageId)}, {
          page
        });

        client.emit('socket-result', {
          type: 'save-webgl-page',
          err: false,
          msg: 'save ok'
        });
      } catch (e) {
        client.emit('socket-result', {
          type: 'save-webgl-page',
          err: true,
          msg: 'save error!'
        })
        throw new Error(e)
      }
    })
  }



  listen() {
    this.socket.on('connection', client => {
      this.autoSaveWebGLPage(client);
    });
    this.socket.listen(port);
    console.log('socket listen in 3000!');
  }
}

