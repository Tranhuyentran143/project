import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'address', default: '' })
  address?: string;

  @Column({ name: 'email', default: '' })
  email?: string;

  @Column({ name: 'role', default: 'USER' })
  role: string;

  @Column({ name: 'userName', default: '' })
  userName?: string;

  @Column({ name: 'password', default: '' })
  password?: string;

  @Column({ name: 'phone' })
  phone: string;

  // @OneToMany(() => CartEntity, (cart) => cart.user)
  // @JoinTable({ name: `cart_id` })
  // carts: CartEntity[];

  // @OneToMany(() => CartEntity, cart => cart.user)
  // @JoinColumn({ name: 'cart_id' })
  // cart: CartEntity;
}
