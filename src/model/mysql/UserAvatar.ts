import { Column, Entity, PrimaryColumn, EntityRepository, Repository } from 'typeorm';

@Entity()
export class UserAvatar {
  @PrimaryColumn({ type: 'varchar', length: 30 }) id!: string;
  @Column({ type: 'varchar', length: 100 }) source!: string;
  @Column({ type: 'varchar', length: 20 }) type!: string;
  @Column({ type: 'varchar', length: 20 }) name!: string;
}

@EntityRepository(UserAvatar)
export class UserAvatarRepository extends Repository<UserAvatar> {

}