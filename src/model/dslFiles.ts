import { Column, Entity, EntityRepository, PrimaryColumn, Repository } from 'typeorm';

export enum FileType {
  FOLDER = 'folder',
  FILE = 'file'
}

@Entity()
export default class DslFiles {
  @PrimaryColumn({ type: 'varchar', length: 30 }) id!: string;
  @PrimaryColumn({ type: 'varchar', length: 30 }) own!: string;
  @Column({ type: 'varchar' }) fileType!: string;
  @Column({ type: 'varchar', length: 40 }) filename!: string;
  @Column({ type: 'varchar', length: 30 }) folder!: string;
  @Column({ type: 'varchar' }) code!: string;
}

@EntityRepository(DslFiles)
export class DslFilesRepository extends Repository<DslFiles> {

}