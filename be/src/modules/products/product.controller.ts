import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/core/dto/product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ProductEntity } from 'src/core/entity/product.entity';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Get()
  async getProducts(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    try {
      if (limit && offset) {
        return await this.productService.getProducts(limit, offset);
      } else {
        return await this.productService.getAllProducts();
      }
    } catch (error) {
      return { statusCode: 500, message: 'Error while fetching products' };
    }
  }

  @Get('/sortedByPrice')
  async getProductsSortedByPrice(
    @Query('limit') limit: number = 9,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.productService.getProductsSortedByPrice(limit, offset);
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching products sorted by price',
      };
    }
  }

  @Get('/sortedByName')
  async getProductsSortedByName(
    @Query('limit') limit: number = 9,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.productService.getProductsSortedByName(limit, offset);
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching products sorted by name',
      };
    }
  }

  @Get('/:product_id')
  async getProductById(@Param('product_id') product_id: number) {
    try {
      return await this.productService.getProductById(product_id);
    } catch (error) {
      return { statusCode: 500, message: 'Error while fetching the product' };
    }
  }

  @Get('/search/:name')
  async searchProducts(
    @Param('name') name: string,
    @Query('limit') limit: number = 9,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.productService.searchProducts(name, limit, offset);
    } catch (error) {
      return { statusCode: 500, message: 'Error while searching for products' };
    }
  }

  @Get('/category/:categoryName')
  async getProductsByCategoryName(
    @Param('categoryName') categoryName: string,
    @Query('limit') limit: number = 9,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.productService.getProductsByCategoryName(
        categoryName,
        limit,
        offset,
      );
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error while fetching products by category name',
      };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Post()
  async createProduct(@Body() product: ProductDto) {
    try {
      return await this.productService.createProduct(product);
    } catch (error) {
      return { statusCode: 500, message: 'Error while creating the product' };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Put('/:product_id')
  async updateProduct(
    @Param('product_id') product_id: number,
    @Body() product: ProductDto,
  ) {
    try {
      return await this.productService.updateProduct(product_id, product);
    } catch (error) {
      return { statusCode: 500, message: 'Error while updating the product' };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Delete('/:product_id')
  async deleteProductById(@Param('product_id') product_id: number) {
    try {
      await this.productService.deleteProductById(product_id);
      return { statusCode: 200, message: 'Product successfully deleted' };
    } catch (error) {
      return { statusCode: 500, message: 'Error while deleting the product' };
    }
  }
}
