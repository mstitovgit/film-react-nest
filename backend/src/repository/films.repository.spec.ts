import { Test, TestingModule } from '@nestjs/testing';
import { FilmsTypeOrmRepository } from './films.repository';

describe('FilmsMongoDbRepository', () => {
  let provider: FilmsTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsTypeOrmRepository],
    }).compile();

    provider = module.get<FilmsTypeOrmRepository>(FilmsTypeOrmRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
