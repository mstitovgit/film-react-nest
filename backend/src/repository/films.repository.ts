import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetFilmsResponseDTO,
  GetFilmsDTO,
  GetScheduleResponseDTO,
  GetScheduleDTO,
} from 'src/films/dto/films.dto';
import {
  ITicket,
  PostOrderResponseDTO,
  OrderResultDTO,
} from 'src/order/dto/order.dto';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Film } from './films.entity';

@Injectable()
export class FilmsTypeOrmRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<GetFilmsResponseDTO> {
    const items = await this.filmRepository.find();
    const mapped: GetFilmsDTO[] = items.map((f) => ({
      id: f.id,
      rating: f.rating,
      director: f.director,
      tags: f.tags,
      title: f.title,
      about: f.about,
      description: f.description,
      image: f.image,
      cover: f.cover,
    }));
    return { total: mapped.length, items: mapped };
  }

  async findSchedule(filmId: string): Promise<GetScheduleResponseDTO> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
      order: { schedule: { daytime: 'ASC', hall: 'ASC' } },
    });
    if (!film) return { total: 0, items: [] };

    const items: GetScheduleDTO[] = film.schedule.map((s) => ({
      id: s.id,
      film: filmId,
      daytime: s.daytime.toISOString(),
      hall: s.hall.toString(),
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    }));
    return { total: items.length, items };
  }

  async bookTickets(tickets: ITicket[]): Promise<PostOrderResponseDTO> {
    if (tickets.length === 0) {
      return { total: 0, items: [] };
    }

    const filmId = tickets[0].film;
    const sessionId = tickets[0].session;
    const results: OrderResultDTO[] = [];

    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });
    if (!film) {
      throw new NotFoundException({ error: 'Film not found' });
    }

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      throw new NotFoundException({ error: 'Session not found' });
    }

    for (const t of tickets) {
      const seatStr = `${t.row}:${t.seat}`;

      if (session.taken.includes(seatStr)) {
        throw new BadRequestException({
          error: `Seat ${seatStr} is already taken`,
        });
      }

      session.taken.push(seatStr);
      results.push({
        id: randomUUID(),
        film: t.film,
        session: t.session,
        daytime: t.daytime,
        row: t.row,
        seat: t.seat,
        price: t.price,
      });
    }

    await this.filmRepository.save(film);

    return {
      total: results.length,
      items: results,
    };
  }
}
