import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'productcategories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ name: 'category_name' })
  category_name: string;

}
