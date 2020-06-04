import MySQL from '../database/mysql';
import { User, UserRepository } from '../model/mysql/User';
import { getCustomRepository } from 'typeorm';
import UserAvatar, { UserAvatarRepository } from '../model/mysql/UserAvatar';
import { md5 } from '../utils/md5';

async function testMySQLConnection() {
  await MySQL.connect([UserAvatar]);
  const avatarRepository = getCustomRepository(UserAvatarRepository);
  let i = 0;
  let images = [
    'http://localhost:9000/image/anime-1.jpeg',
    'http://localhost:9000/image/anime-2.jpeg',
    'http://localhost:9000/image/anime-3.jpg',
    'http://localhost:9000/image/anime-4.png',
    'http://localhost:9000/image/anime-5.jpg',
    'http://localhost:9000/image/anime-6.jpg',
    'http://localhost:9000/image/anime-7.jpg'
  ];
  for (let v of images) {
    let avatar = new UserAvatar();
    avatar.id = md5(String(Date.now() + Math.random()) + String(i++));
    avatar.source = v;
    avatar.type = 'anime';
    avatar.name = 'anime 0'+i;
    await avatarRepository.save(avatar);
  }
}

class Controller {
  private user = getCustomRepository(UserRepository);

  find() {
    return this.user.find({ email: 'ssss' });
  }
}

testMySQLConnection().catch();