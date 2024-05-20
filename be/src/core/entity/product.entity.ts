import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { CartEntity } from './cart.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id?: number;

  @Column({ name: 'name', default: '' })
  name: string;

  @Column({ name: 'price',})
  price: number;

  @Column({ name: 'image_url', default: '' })
  image_url: string;

  @Column({ name: 'quantity', default: 50  })
  quantity: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'category_id',  default: 7  })
  category_id: number;

  @Column({ name: 'categoryName', default: "other" })
  categoryName: string;

  // @ManyToOne(() => CartEntity, cart => cart.products)
  // @JoinColumn({ name: 'cart_id' })
  // cart: CartEntity[];
}
