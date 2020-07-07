import { Column, Entity, EntityRepository, PrimaryColumn, Repository } from 'typeorm';

@Entity({ name: 'dsl_file' })
export default class DslFile {
  @PrimaryColumn({ type: 'varchar', length: 30 }) id!: string;
  @PrimaryColumn({ type: 'varchar', length: 30 }) own!: string;
  @Column({ type: 'varchar', length: 40 }) name!: string;
  @Column({ type: 'varchar', length: 30 }) folder!: string;
  @Column({ type: 'bigint' }) createTime!: number;
  @Column({ type: 'varchar', length: 50 }) fileId!: string;

  constructor(params?: { id: string, own: string, name: string, folder: string, createTime: number, fileId: string }) {
    if (params) {
      this.id = params.id;
      this.own = params.own;
      this.name = params.name;
      this.folder = params.folder;
      this.createTime = params.createTime;
      this.fileId = params.fileId;
    }
  }
}

@EntityRepository(DslFile)
export class DslFileRepository extends Repository<DslFile> {

}