import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ApiProperty({ type: () => OrderItemDto })
  items: OrderItemDto[];

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  card_hash: string;
}

export class OrderItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @MaxLength(36)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  product_id: string;
}
