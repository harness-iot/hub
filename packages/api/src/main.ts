import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { BleService } from './ble/ble.service';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new LoggerService(),
    });

    const configService = app.get(ConfigService);
    await app.listen(configService.PORT, configService.BASE_HOST);

    // Start BLE advertising
    const ble = app.get(BleService);
    ble.start();
  } catch (err) {
    const logger = new LoggerService();
    logger.error('Intrakit Launch Failed!', err);
  }
}

bootstrap();
