import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/core/dto/product.dto';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }
  

  @Get('/:product_id')
  async getProductById(@Param('product_id') product_id: number) {
    return this.productService.getProductById(product_id);
  }

  @Get('/:categoryName')
  async getProductsByCategoryName(@Param('categoryName') categoryName: string) {
    return await this.productService.getProductsByCategoryName(categoryName);
  }

  @Post()
  async createProduct(@Body() product: ProductDto) {
    return await this.productService.createProduct(product);
  }

  @Put('/:product_id')
  async updateProduct(@Param('product_id') product_id: number, @Body() product: ProductDto) {
    return await this.productService.updateProduct(product_id, product);
  }

  @Delete('/:product_id')
  async deleteProductById(@Param('product_id') product_id: number) {
    return await this.productService.deleteProductById(product_id);
  }
}
