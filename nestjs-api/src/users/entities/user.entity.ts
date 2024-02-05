import { Order } from '../../orders/entities/order.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'super-admin',
}

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ enum: UserRole })
  @Exclude({ toPlainOnly: true })
  @Column()
  role: UserRole = UserRole.USER;

  @ApiProperty({ type: () => Order })
  @OneToMany(() => Order, (order) => order.user, { lazy: true })
  orders: Promise<Order[]>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
