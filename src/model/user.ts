import { Column, Entity, PrimaryColumn, EntityRepository, Repository } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 30 }) email!: string;
  @Column({ type: 'varchar', length: 20 }) password!: string;
  @Column({ type: 'varchar', length: 200 }) avatar!: string;
  @Column({ type: 'varchar', length: 10 }) sex!: string;
  @Column({ type: 'varchar', length: 20 }) nickname!:string;
  @Column({ type: 'int', width: 3 }) age!: string;
  @Column({ type: 'varchar', length: 20 }) name!: string;
}


@EntityRepository(User)
export class UserRepository extends Repository<User> {

}