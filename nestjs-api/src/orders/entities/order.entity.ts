import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  client_id: string;

  @Column()
  status: OrderStatus = OrderStatus.PENDING;

  @CreateDateColumn()
  created_at: Date;

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
}
