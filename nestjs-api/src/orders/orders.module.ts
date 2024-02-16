import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrderConsumer } from './orders.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderConsumer],
})
export class OrdersModule {}
