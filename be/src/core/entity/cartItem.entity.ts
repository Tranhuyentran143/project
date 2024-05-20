import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderId)
  @JoinColumn({ name: 'orderId' })
  orderId: number;

  @ManyToOne(() => ProductEntity, (order) => order.product_id)
  @JoinColumn({ name: 'product_id' })
  product_id: number;
}
