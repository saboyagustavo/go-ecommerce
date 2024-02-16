import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from '../../users/entities/user.entity';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

type CreateOrderCommand = {
  client_id: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
};

@Entity({ name: 'orders' })
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ApiProperty()
  @Column()
  client_id: string;

  @ApiProperty({ type: () => User })
  @Transform(({ value }) => ({ id: value.id, name: value.name }))
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'client_id' })
  user: User;

  @ApiProperty({ enum: OrderStatus })
  @Column()
  status: OrderStatus = OrderStatus.PENDING;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ type: () => OrderItem, isArray: true })
  @ApiProperty()
  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: ['insert'],
    eager: true,
  })
  items: OrderItem[];

  static create(input: CreateOrderCommand) {
    const order = new Order();

    order.client_id = input.client_id;

    order.items = input.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.product_id = item.product_id;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      return orderItem;
    });

    order.total = order.items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

    return order;
  }

  pay() {
    if (this.status === OrderStatus.PAID) {
      throw new Error('Order already paid');
    }

    if (this.status === OrderStatus.FAILED) {
      throw new Error('Order already failed');
    }

    this.status = OrderStatus.PAID;
  }

  fail() {
    if (this.status === OrderStatus.FAILED) {
      throw new Error('Order already failed');
    }

    if (this.status === OrderStatus.PAID) {
      throw new Error('Order already paid');
    }

    this.status = OrderStatus.FAILED;
  }
}
