import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { StatusService } from './status/status.service';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
    },
  );

  await app.listen();

  // Init controller status
  const status = app.get(StatusService);
  await status.bootstrap();

  const nodes = status.getStatus();

  console.log('LOADED NODES: ', nodes);

  logger.verbose('Controller is listening...');
}
bootstrap();
