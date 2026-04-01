import { Injectable } from '@nestjs/common';
import { PostOrderRequestDTO, PostOrderResponseDTO } from './dto/order.dto';
import { FilmsTypeOrmRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsTypeOrmRepository) {}

  async bookTickets(order: PostOrderRequestDTO): Promise<PostOrderResponseDTO> {
    return this.filmsRepo.bookTickets(order.tickets);
  }
}
