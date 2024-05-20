import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ type: 'float', name: 'totalPrice' })
  totalPrice: number;

  @Column({ name: 'totalQuantity' })
  totalQuantity: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'id' })
  id: number;

  @Column()
  phone: String;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date = new Date();

  @Column({ type: 'datetime', nullable: true, default: null })
  updatedDate: Date;

  @Column()
  shipping_code: String;

  @Column()
  status: String;

  @Column()
  address: String;
}
