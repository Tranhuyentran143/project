// import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CartDto } from 'src/core/dto/cart.dto';
// import { CartEntity } from 'src/core/entity/cart.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CartService {
//   constructor(
//     @InjectRepository(CartEntity)
//     private readonly cartRepo: Repository<CartEntity>,
//   ) {}

//   // @Get('/:user_id')
//   // async getCartItemsByUserId(@Param('user_id') userId: number) {
//   //   console.log(userId);
//   //   return await this.cartRepo
//   //     .createQueryBuilder('cart')
//   //     .innerJoinAndSelect('cart.products', 'product')
//   //     .where('cart.user.id = :userId', { userId })
//   //     .getMany();
//   // }

//   async getCartItemsByUserId(userId: number) {
//     try {
//       console.log(userId);
//       const cartItems = await this.cartRepo
//         .createQueryBuilder('cart')
//         .innerJoinAndSelect('cart.products', 'product')
//         .where('cart.user.id = :userId', { userId })
//         .getMany();
//       return cartItems;
//     } catch (error) {
//       throw new Error(
//         `Error fetching cart items for user with id ${userId}: ${error.message}`,
//       );
//     }
//   }

//   async addToCart(cartDto: CartDto) {
//     // console.log(cartDto);

//     const newCartItem = this.cartRepo.create(cartDto);
//     return await this.cartRepo.save(newCartItem);
//   }

//   async updateCartItem(id: number, cartDto: CartDto) {
//     const cartItem = await this.cartRepo.findOneBy({ id });
//     if (!cartItem) {
//       throw new NotFoundException(`Cart item with id ${id} not found`);
//     }

//     Object.assign(cartItem, cartDto);
//     return await this.cartRepo.save(cartItem);
//   }

//   async removeCartItem(id: number) {
//     const result = await this.cartRepo.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Cart item with id ${id} not found`);
//     }
//   }

//   async clearCart(userId: number) {
//     const result = await this.cartRepo.delete({ user: { id: userId } });
//     if (result.affected === 0) {
//       throw new NotFoundException(
//         `Cart items for user with id ${userId} not found`,
//       );
//     }
//   }

//   async increaseQty(id: number) {
//     const item = await this.cartRepo.findOneBy({ id });
//     if (item) {
//       item.quantity++;
//       await this.cartRepo.save(item);
//     }
//   }

//   async decreaseQty(id: number) {
//     const item = await this.cartRepo.findOneBy({ id });
//     if (item) {
//       if (item.quantity > 1) {
//         item.quantity--;
//         await this.cartRepo.save(item);
//       } else {
//         await this.cartRepo.remove(item);
//       }
//     }
//   }
// }

// // import { Injectable, NotFoundException } from "@nestjs/common";
// // import { InjectRepository } from "@nestjs/typeorm";
// // import { CartDto } from "src/core/dto/cart.dto";
// // import { CartEntity } from "src/core/entity/cart.entity";
// // import { Repository } from "typeorm";

// // @Injectable()
// // export class CartService {
// //   constructor(
// //     @InjectRepository(CartEntity)
// //     private readonly cartRepo: Repository<CartEntity>,
// //   ) {}

// //   async getCartItems(): Promise<CartEntity[]> {
// //     return await this.cartRepo.find();
// // };

// //   async addToCart(cartDto: CartDto) {
// //     const newCartItem = this.cartRepo.create(cartDto);
// //     return await this.cartRepo.save(newCartItem);
// //   }

// //   async updateCartItem(id: number, cartDto: CartDto) {
// //     const cartItem = await this.cartRepo.findOneBy( {id});
// //     if (!cartItem) {
// //       throw new NotFoundException(`Cart item with product_id ${id} not found`);
// //     }

// //     Object.assign(cartItem, cartDto);
// //     return await this.cartRepo.save(cartItem);
// //   }

// // //   async removeCartItem(product_id: number) {
// // //     const result = await this.cartRepo.delete( product_id );
// // //     if (result.affected === 0) {
// // //       throw new NotFoundException(`Cart item with productId ${product_id} not found`);
// // //     }
// // //   }
// // // }

// //   async addCartItem(itemData: Partial<CartEntity>) {
// //     const newItem = this.cartRepo.create(itemData);
// //     return await this.cartRepo.save(newItem);
// //   }

// //   async removeCartItem(id: number) {
// //     await this.cartRepo.delete(id);
// //   }

// //   async clearCart() {
// //     await this.cartRepo.clear();
// //   }
// // }
