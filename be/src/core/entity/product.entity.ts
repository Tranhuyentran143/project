import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id?: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'image_url' })
  image_url: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'category_id' })
  category_id: number;

  @Column({ name: 'categoryName' })
  categoryName: string;
}
