import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { PostOrderRequestDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() order: PostOrderRequestDTO) {
    return this.orderService.bookTickets(order);
  }
}
