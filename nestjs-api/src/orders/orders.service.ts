import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const client_id = '1';
    const orderItemDto = createOrderDto.items;

    const productIds = orderItemDto.map((item) => item.product_id);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepo.findBy({
      id: In(uniqueProductIds),
    });

    if (products.length !== uniqueProductIds.length) {
      throw new Error(
        `Some product may not exist.
        Got products amount: ${uniqueProductIds.length},
        Found products amount: ${products.length}`,
      );
    }

    const items = orderItemDto.map((orderItem) => {
      const product = products.find(
        (product) => product.id === orderItem.product_id,
      );
      return {
        price: product.price,
        product_id: orderItem.product_id,
        quantity: orderItem.quantity,
      };
    });

    const order = Order.create({
      client_id,
      items,
    });

    return await this.orderRepo.save(order);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
