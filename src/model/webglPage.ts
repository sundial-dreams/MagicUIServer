import { Column, Entity, EntityRepository, PrimaryColumn, Repository } from 'typeorm';

@Entity()
export class WebglPage {
  @PrimaryColumn({type: 'varchar', length: 100}) id!:string;
  @Column({type: 'varchar', length: 20}) name!:string;
  @Column({type: 'varchar', length: 100}) description!:string;
  @Column({type: 'bigint'}) createTime!:number;
  @Column({type: 'varchar', length: 20}) own!:string;
}

@EntityRepository(WebglPage)
export class WebglPageRepository extends Repository<WebglPage> {

}