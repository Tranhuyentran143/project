import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/core/dto/product.dto';
import { ProductEntity } from 'src/core/entity/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async getAllProducts() {
    return await this.productRepo.find();
  }
  async getProducts(limit: number, offset: number) {
    return await this.productRepo.find({
      skip: offset,
      take: limit,
    });
  }

  async getProductsSortedByPrice(limit: number, offset: number) {
    return await this.productRepo.find({
      order: {
        price: 'ASC',
      },
      skip: offset,
      take: limit,
    });
  }

  async getProductsSortedByName(limit: number, offset: number) {
    return await this.productRepo.find({
      order: {
        name: 'ASC',
      },
      skip: offset,
      take: limit,
    });
  }

  async getProductById(product_id: number) {
    return await this.productRepo.findOneBy({product_id});
  }

  async searchProducts(searchName: string, limit: number, offset: number): Promise<ProductEntity[]> {
    return await this.productRepo.find({
      where: {
        name: ILike(`%${searchName}%`),
      },
      skip: offset,
      take: limit,
    });
  }

  async getProductsByCategoryName(categoryName: string, limit: number, offset: number) {
    if (categoryName === 'all') {
      return await this.productRepo.find({
        skip: offset,
        take: limit,
      });
    }
    return await this.productRepo.find({
      where: { categoryName: categoryName },
      skip: offset,
      take: limit,
    });
  }

  async createProduct(productDto: ProductDto) {
    const newProduct = this.productRepo.create(productDto);
    return await this.productRepo.save(newProduct);
  }

  async updateProduct(product_id: number, productDto: ProductDto) {
    const product = await this.productRepo.findOneBy({product_id});
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
