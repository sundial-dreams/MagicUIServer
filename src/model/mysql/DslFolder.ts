import { Column, Entity, EntityRepository, PrimaryColumn, Repository } from 'typeorm';

@Entity({name: 'dsl_folder'})
export default class DslFolder {
  @PrimaryColumn({ type: 'varchar', length: 30 }) id!: string;
  @PrimaryColumn({ type: 'varchar', length: 30 }) own!: string;
  @Column({ type: 'varchar', length: 40 }) name!: string;
  @Column({ type: 'varchar', length: 30 }) folder!: string;
  @Column({ type: 'bigint' }) createTime!: number;

  constructor(params?: { id: string, own: string, name: string, folder: string, createTime: number }) {
    if (params) {
      this.id = params.id;
      this.own = params.own;
      this.name = params.name;
      this.folder = params.folder;
      this.createTime = params.createTime;
    }
  }
}

@EntityRepository(DslFolder)
export class DslFolderRepository extends Repository<DslFolder> {

}