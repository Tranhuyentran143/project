import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/core/dto/category.dto';
import { CategoryEntity } from 'src/core/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async getCategories() {
    return await this.categoryRepo.find();
  }

  async getCategoryById(categoryId: number) {
    return await this.categoryRepo.findOneBy({ category_id: categoryId });
  }

  async getCategoryByName(category_name: string) {
    return await this.categoryRepo.findOneBy({ category_name });
  }

  async createCategory(categoryDto: CategoryDto) {
    const newCategory = this.categoryRepo.create(categoryDto);
    return await this.categoryRepo.save(newCategory);
  }

  async updateCategory(category_id: number, categoryDto: CategoryDto) {
    const category = await this.categoryRepo.findOneBy({category_id});
    if (!category) {
      throw new Error('Category not found');
    }
    Object.assign(category, categoryDto);
    return await this.categoryRepo.save(category);
  }

  async deleteCategoryById(category_id: number) {
    return await this.categoryRepo.delete(category_id);
  }
}
