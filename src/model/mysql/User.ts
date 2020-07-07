import { Column, Entity, PrimaryColumn, EntityRepository, Repository } from 'typeorm';

@Entity({name: 'user'})
export class User {
  @PrimaryColumn({ type: 'varchar', length: 30 }) email!: string;
  @Column({ type: 'varchar', length: 20 }) password!: string;
  @Column({ type: 'varchar', length: 200 }) avatar!: string;
  @Column({ type: 'varchar', length: 10 }) sex!: string;
  @Column({ type: 'varchar', length: 20 }) nickname!: string;
  @Column({ type: 'int', width: 3 }) age!: number;
  @Column({ type: 'varchar', length: 20 }) name!: string;

  constructor(params?: { email: string, password: string, avatar: string, sex: string, nickname: string, age: number, name: string }) {
    if (params) {
      this.email = params.email;
      this.password = params.password;
      this.avatar = params.avatar;
      this.sex = params.sex;
      this.nickname = params.nickname;
      this.age = params.age;
      this.name = params.name;
    }
  }
}


@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
