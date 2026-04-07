import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { AppConfig, AppConfigModule } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './repository/schedule.entity';
import { Film } from './repository/films.entity';
import { FilmsTypeOrmRepository } from './repository/films.repository';
import { LoggerModule } from './logger/logger.provider';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: ['CONFIG'],
      useFactory: (config: AppConfig) => ({
        type: config.database.driver as 'postgres',
        url: config.database.url,
        username: config.database.username,
        password: config.database.password,
        entities: [Film, Schedule],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsTypeOrmRepository, FilmsService, OrderService],
})
export class AppModule {}
