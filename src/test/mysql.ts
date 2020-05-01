
import MySQL from '../database/mysql';
import { User, UserRepository } from '../model/user';
import { getCustomRepository } from 'typeorm';

async function testMySQLConnection() {
  await MySQL.connect([User]);

  let d = await new Controller().find();
  console.log(d);
}

class Controller {
  private user = getCustomRepository(UserRepository);

  find() {
    return this.user.find({email: 'ssss'});
  }
}

testMySQLConnection().catch()