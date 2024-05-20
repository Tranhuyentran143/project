// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CartService } from './cart.service';
// import { CartEntity } from 'src/core/entity/cart.entity';
// import { CartController } from './cart.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([CartEntity])],
//   controllers: [CartController],
//   providers: [CartService],
// })
// export class CartModule {}
// order.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/core/entity/order.entity';
import { ProductEntity } from 'src/core/entity/product.entity';
import { UserEntity } from 'src/core/entity/user.entity';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { CartItemEntity } from 'src/core/entity/cartItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      ProductEntity,
      CartItemEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
