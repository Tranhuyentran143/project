import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/core/dto/product.dto';
import { ProductEntity } from 'src/core/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async getProducts() {
    return await this.productRepo.find({
      relations: {
        // category: true,
      },
    });
  }

  async getProductById(product_id: number) {
    return await this.productRepo.findOneBy({ product_id });
  }

  // async getProductsByCategoryName(categoryName: string) {
  //   return await this.productRepo.findOne({
  //     where: {
  //       categoryName: categoryName
  //     }
  //   });
  // }

  async getProductsByCategoryName(categoryName: string) {
    return await this.productRepo.createQueryBuilder("products")
      .innerJoinAndSelect("products.category", "category")
      .where("category.categoryName = :categoryName", { categoryName })
      .getMany();
  }

  async createProduct(productDto: ProductDto) {
    const newProduct = this.productRepo.create(productDto);
    return await this.productRepo.save(newProduct);
  }

  //   async updateProduct(product_id: number, productDto: ProductDto) {
  //     await this.productRepo.update(product_id, productDto);
  //     return await this.productRepo.findOneBy({product_id});
  //   }

  async updateProduct(product_id: number, productDto: ProductDto) {
    const product = await this.productRepo.findOneBy({ product_id });
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, productDto);
    return await this.productRepo.save(product);
  }

  async deleteProductById(product_id: number) {
    return await this.productRepo.delete(product_id);
  }
}
