import { Column, Entity, EntityRepository, PrimaryColumn, Repository } from 'typeorm';

@Entity()
export class WebglPage {
  @PrimaryColumn({ type: 'varchar', length: 100 }) id!: string;
  @Column({ type: 'varchar', length: 20 }) name!: string;
  @Column({ type: 'varchar', length: 100 }) description!: string;
  @Column({ type: 'bigint' }) createTime!: number;
  @Column({ type: 'varchar', length: 20 }) own!: string;
  @Column({ type: 'varchar', length: 50 }) pageId!: string;

  constructor(params?: { id: string, name: string, description: string, createTime: number, own: string, pageId: string }) {
    if (params) {
      this.id = params.id;
      this.name = params.name;
      this.description = params.description;
      this.createTime = params.createTime;
      this.own = params.own;
      this.pageId = params.pageId;
    }
  }
}

@EntityRepository(WebglPage)
export class WebglPageRepository extends Repository<WebglPage> {

}