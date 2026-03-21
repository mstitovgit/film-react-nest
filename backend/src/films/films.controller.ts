import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Controller('films')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  getAll() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  findById(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
