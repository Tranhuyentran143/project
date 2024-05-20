// import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, OneToMany, JoinTable } from 'typeorm';
// import { UserEntity } from './user.entity';
// import { ProductEntity } from './product.entity';

// @Entity()
// export class CartEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   quantity: number;

//   @ManyToOne(() => UserEntity, user => user.id)
//   @JoinColumn({ name: 'user_id' })
//   user: UserEntity;

//   @OneToMany(() => ProductEntity, product => product.cart)
//   products: ProductEntity[];
// }
