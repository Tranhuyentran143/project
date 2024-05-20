// import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { CartDto } from 'src/core/dto/cart.dto';

// @Controller('/api/v1/carts')
// export class CartController {
//   constructor(private readonly cartService: CartService) {}

//   // @Get()
//   // async getCartItems() {
//   //   return await this.cartService.getCartItems();
//   // }

//   @Get('/:id')
//   async getCartItemsById(@Param('id') id: number) {
//     try {
//       const cartItems = await this.cartService.getCartItemsByUserId(id);
//       console.log(cartItems);  
//       return { success: true, data: cartItems };
//     } catch (error) {
//       return { success: false, message: error.message };
//     }
//   }  

//   @Get('/user/:user_id')
//   async getCartItemsByUserId(@Param('user_id') userId: number) {
//     console.log(userId);
//     return await this.cartService.getCartItemsByUserId(userId); // Thay cartRepo bằng cartService
//   }

//   @Post()
//   async addToCart(@Body() cartDto: CartDto) {
//     return await this.cartService.addToCart(cartDto);
//   }

//   @Put('/update/:id')
//   async updateCartItem(@Param('id') id: number, @Body() cartDto: CartDto) {
//     return await this.cartService.updateCartItem(id, cartDto);
//   }

//   @Delete('/delete/:id')
//   async removeCartItem(@Param('id') id: number) {
//     return await this.cartService.removeCartItem(id);
//   }

//   @Put('increase/:cartId')
//   async increaseQty(@Param('cartId') id: number) {
//     return await this.cartService.increaseQty(id);
//   }
  
//   @Put('decrease/:id')
//   async decreaseQty(@Param('id') id: number) {
//     return await this.cartService.decreaseQty(id);
//   }
// }

// //   @Put(':id')
// //   async updateCartItem(@Param('cartId') cartId: number, @Body() cartDto: CartDto) {
// //     return await this.cartService.updateCartItem(cartId, cartDto);
// //   }


// //   @Delete(':cartId')
// //   async removeCartItem(@Param('cartId') cartId: number) {
// //     return await this.cartService.removeCartItem(cartId);
// //   }

// //   @Delete()
// //   async clearCart() {
// //     return await this.cartService.clearCart();
// //   }
// // }
