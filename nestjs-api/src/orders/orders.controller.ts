import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: Order })
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const { userId } = req.sessionData;
    return this.ordersService.create({
      ...createOrderDto,
      client_id: userId,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Order, isArray: true })
  findAll(@Req() req: Request) {
    return this.ordersService.findAll(req['sessionData'].userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Order })
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.ordersService.findOne(id, req['sessionData'].userId);
  }
}
