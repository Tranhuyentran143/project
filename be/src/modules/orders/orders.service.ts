import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/core/dto/order.dto';
import { ProductDto } from 'src/core/dto/product.dto';
import { CartItemEntity } from 'src/core/entity/cartItem.entity';
import { OrderEntity } from 'src/core/entity/order.entity';
import { ProductEntity } from 'src/core/entity/product.entity';
import { UserEntity } from 'src/core/entity/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepo: Repository<CartItemEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createOrder(orderDto: OrderDto) {
    const id = orderDto.id;
    const user = await this.userRepo.findOneBy({ id });
    orderDto.phone = user.phone;
    orderDto.address = user.address;
    const newOrder = this.orderRepo.create(orderDto);
    const order = await this.orderRepo.save(newOrder);
    const orderId = order.orderId;

    const entities: DeepPartial<CartItemEntity>[] = [];
    for (const item of orderDto.items) {
      const { quantity, price, product_id } = item;

      const product = await this.productRepo.findOneBy(product_id);
      if (!product) {
        continue;
      }

      entities.push({
        quantity,
        price,
        orderId,
        product_id,
      });
    }

    // Create the cart item entities
    const newCartItems = this.cartItemRepo.create(entities);

    // Save all cart item entities in a single transaction
    const savedCartItems = await this.cartItemRepo.save(newCartItems);

    return savedCartItems;
  }

  async getOrders() {
    return this.orderRepo.find();
  }

  async getOrderDetails(orderId: number) {
    const order = await this.orderRepo.findOne({
      where: { orderId },
      relations: ['id'],
    });

    const oderItem = await this.cartItemRepo.find({
      where: { orderId },
      relations: ['product_id'],
    });

    const products = [];
    for (const item of oderItem) {
      products.push(item.product_id);
    }

    return { order, products };
  }

  async updateStatusOder(orderId: number, status: string, address: string) {
    const order = await this.orderRepo.findOneBy({ orderId });
    if (!order) {
      throw new NotFoundException(`Order item with id ${orderId} not found`);
    }
    order.status = status;
    order.address = address;
    order.updatedDate = new Date();
    const updated = await this.orderRepo.save(order);
    if (status == 'CONFIRM' && updated) {
      const oderItem = await this.cartItemRepo.find({
        where: { orderId },
        relations: ['product_id'],
      });
      for (const item of oderItem) {
        const product = item.product_id;
        const qNumber = product['quantity'];
        const quantity = qNumber - item.quantity;
        const productDTO = new ProductDto();
        productDTO.product_id = product['product_id'];
        productDTO.name = product['name'];
        productDTO.price = product['price'];
        productDTO.image_url = product['image_url'];
        productDTO.quantity = quantity;
        productDTO.description = product['description'];
        productDTO.category_id = product['category_id'];
        await this.productRepo.save(productDTO);
      }

      // return oderItem;
    }
    return updated;
  }

  async updateQuanlityProduct(produtId: number) {}
}
