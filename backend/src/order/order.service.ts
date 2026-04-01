import { Injectable } from '@nestjs/common';
import { PostOrderRequestDTO, PostOrderResponseDTO } from './dto/order.dto';
import { FilmsMongoDbRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsMongoDbRepository) {}

  async bookTickets(order: PostOrderRequestDTO): Promise<PostOrderResponseDTO> {
    return this.filmsRepo.bookTickets(order.tickets);
  }
}
