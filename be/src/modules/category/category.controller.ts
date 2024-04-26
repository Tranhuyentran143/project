import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/core/dto/category.dto';

@Controller('/api/v1/productcategories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Get('/:category_id')
  async getCategoryById(@Param('category_id') category_id: number) {
    return this.categoryService.getCategoryById(category_id);
  }

  @Get('/:category_name')
async getCategoryByName(@Param('category_name') category_name: string) {
  return this.categoryService.getCategoryByName(category_name);
}

  @Post()
  async createCategory(@Body() category: CategoryDto) {
    return this.categoryService.createCategory(category);
  }

  @Put('/:category_id')
  async updateCategory(@Param('category_id') categoryId: number, @Body() category: CategoryDto) {
    return this.categoryService.updateCategory(categoryId, category);
  }

  @Delete('/:category_id')
  async deleteCategoryById(@Param('category_id') categoryId: number) {
    return this.categoryService.deleteCategoryById(categoryId);
  }
}
