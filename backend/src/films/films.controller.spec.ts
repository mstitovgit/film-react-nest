import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    getFilmSchedule: jest.fn(),
    getAllFilms: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(mockFilmsService)
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.getAll() should call getAllFilms method of FilmsService', () => {
    controller.getAll();
    expect(service.getAllFilms).toHaveBeenCalled();
  });

  it('.findById() should call getFilmSchedule method of FilmsService', () => {
    const filmId = '123';
    controller.findById(filmId);
    expect(service.getFilmSchedule).toHaveBeenCalledWith(filmId);
  });
});
