// import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
// import { CategoryService } from './category.service';
// import { CategoryDto } from 'src/core/dto/category.dto';
// import { AuthGuard } from 'src/guards/auth.guard';
// import { RoleGuard } from 'src/guards/role.guard';

// @Controller('/api/v1/productcategories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Get()
//   async getCategories() {
//     return await this.categoryService.getCategories();
//   }

//   @Get('/:category_id')
//   async getCategoryById(@Param('category_id') category_id: number) {
//     return await this.categoryService.getCategoryById(category_id);
//   }

//   @Get('/abc/:category_name')
//   async getCategoryByName(@Param('category_name') category_name: string) {
//     return await this.categoryService.getCategoryByName(category_name);
//   }

//     @UseGuards(AuthGuard)
//     @UseGuards(RoleGuard)

//   @Post()
//   async createCategory(@Body() category: CategoryDto) {
//     return await this.categoryService.createCategory(category);
//   }

//   @Put('/:category_id')
//   async updateCategory(@Param('category_id') categoryId: number, @Body() category: CategoryDto) {
//     return await this.categoryService.updateCategory(categoryId, category);
//   }

//   @Delete('/:category_id')
//   async deleteCategoryById(@Param('category_id') categoryId: number) {
//     return await this.categoryService.deleteCategoryById(categoryId);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/core/dto/category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('/api/v1/productcategories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Get()
  async getCategories() {
    try {
      return await this.categoryService.getCategories();
    } catch (error) {
      return { statusCode: 500, message: 'Error while fetching categories' };
    }
  }

  @Get('/:category_id')
  async getCategoryById(@Param('category_id') category_id: number) {
    try {
      return await this.categoryService.getCategoryById(category_id);
    } catch (error) {
      return { statusCode: 500, message: 'Error while fetching' };
    }
  }

  @Get('/abc/:category_name')
  async getCategoryByName(@Param('category_name') category_name: string) {
    try {
      return await this.categoryService.getCategoryByName(category_name);
    } catch (error) {
      return { statusCode: 500, message: 'Error while fetching by name' };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Post()
  async createCategory(@Body() category: CategoryDto) {
    try {
      return await this.categoryService.createCategory(category);
    } catch (error) {
      return { statusCode: 500, message: 'Error while creating' };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Put('/:category_id')
  async updateCategory(
    @Param('category_id') categoryId: number,
    @Body() category: CategoryDto,
  ) {
    try {
      return await this.categoryService.updateCategory(categoryId, category);
    } catch (error) {
      return { statusCode: 500, message: 'Error while updating' };
    }
  }
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Delete('/:category_id')
  async deleteCategoryById(@Param('category_id') categoryId: number) {
    try {
      await this.categoryService.deleteCategoryById(categoryId);
      return { statusCode: 200, message: 'Category successfully deleted' };
    } catch (error) {
      return { statusCode: 500, message: 'Error while deleting' };
    }
  }
}
