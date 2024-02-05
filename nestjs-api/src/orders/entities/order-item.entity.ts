import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'order_items' })
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty()
  @Column()
  product_id: string;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
