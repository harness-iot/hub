import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NodeService } from './node/node.service';

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

    // Load nodes into cache
    const node = app.get(NodeService);
    await node.bootstrap();

    logger.log('Controller started successfully');
  } catch (error) {
    logger.error('Controller failed to start');
  }
}
bootstrap();
