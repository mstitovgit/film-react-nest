import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

import { AppConfig } from './app.config.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './repository/films.schema';
import { FilmsMongoDbRepository } from './repository/films.repository';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { AppConfigModule } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: ['CONFIG'],
      useFactory: (config: AppConfig) => ({
        uri: config.database.url as string,
      }),
    }),

    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsMongoDbRepository, FilmsService, OrderService],
})
export class AppModule {}
