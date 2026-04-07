// src/logger/logger.provider.ts
import { Global, LoggerService, Module } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { DevLogger } from './dev-logger';
import { JsonLogger } from './json-logger';
import { TSKVLogger } from './tskv-logger';

export const loggerProvider = {
  provide: 'LOGGER', // токен для DI
  inject: ['CONFIG'], // берём AppConfig
  useFactory: (config: AppConfig): LoggerService => {
    switch (config.logger.type) {
      case 'json':
        return new JsonLogger();
      case 'tskv':
        return new TSKVLogger();
      default:
        return new DevLogger();
    }
  },
};

@Global()
@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
