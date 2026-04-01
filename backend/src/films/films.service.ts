import { Injectable } from '@nestjs/common';
import { GetFilmsResponseDTO, GetScheduleResponseDTO } from './dto/films.dto';
import { FilmsMongoDbRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepo: FilmsMongoDbRepository) {}

  async getAllFilms(): Promise<GetFilmsResponseDTO> {
    return this.filmsRepo.findAll();
  }

  async getFilmSchedule(filmId: string): Promise<GetScheduleResponseDTO> {
    return this.filmsRepo.findSchedule(filmId);
  }
}
