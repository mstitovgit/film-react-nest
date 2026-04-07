import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username: string;
  password: string;
}

export interface AppConfigLogger {
  type: 'dev' | 'json' | 'tskv';
}

export interface AppConfig {
  database: AppConfigDatabase;
  logger: AppConfigLogger;
}

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER'),
      url: configService.get<string>('DATABASE_URL'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
    },
    logger: {
      type: configService.get<string>('LOGGER_TYPE'),
    } as AppConfigLogger,
  }),
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [configProvider],
  exports: [configProvider],
})
export class AppConfigModule {}
