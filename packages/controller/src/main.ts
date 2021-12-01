import { CACHE_MANAGER, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Cache } from 'cache-manager';

import { AppModule } from './app.module';
import { ConditionalService } from './conditional/conditional.service';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap');

  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.MQTT,
        options: {
          clientId: 'controller',
        },
      },
    );

    await app.listen();

    // flush cache
    const cache = app.get<Cache>(CACHE_MANAGER);
    await cache.reset();

    const conditionals = app.get(ConditionalService);
    await conditionals.bootstrap();

    logger.log('Controller started successfully');
  } catch (error) {
    logger.error('Controller failed to start');
  }
}
bootstrap();
