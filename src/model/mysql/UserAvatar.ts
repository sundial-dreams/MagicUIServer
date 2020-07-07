import { Column, Entity, PrimaryColumn, EntityRepository, Repository } from 'typeorm';

@Entity({ name: 'user_avatar' })
export default class UserAvatar {
  @PrimaryColumn({ type: 'varchar', length: 30 }) id!: string;
  @Column({ type: 'varchar', length: 100 }) source!: string;
  @Column({ type: 'varchar', length: 20 }) type!: string;
  @Column({ type: 'varchar', length: 20 }) name!: string;
  constructor(params?: {id: string, source: string, type: string, name: string}) {
    if (params) {
      this.id = params.id;
      this.source = params.source;
      this.type = params.type;
      this.name = params.name;
    }
  }
}

@EntityRepository(UserAvatar)
export class UserAvatarRepository extends Repository<UserAvatar> {

}