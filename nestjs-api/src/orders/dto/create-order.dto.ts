export class CreateOrderDto {
  items: OrdemItemDto[];
  card_hash: string;
}

export class OrdemItemDto {
  quantity: number;
  product_id: string;
}
