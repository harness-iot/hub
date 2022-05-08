import fs from 'fs';

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

    // Check if first start since install or update
    const configRaw = fs.readFileSync('../config.json', 'utf8');
    const config = JSON.parse(configRaw);

    if (
      config.state === 'initial_boot' ||
      config.state === 'update_successful'
    ) {
      const lernaRaw = fs.readFileSync(
        `${this.configService.BASE_DIR}/lerna.json`,
        'utf8',
      );
      const lerna = JSON.parse(lernaRaw);
      config['version'] = lerna.version;
      config['state'] = 'running';
      fs.writeFileSync('../config.json', JSON.stringify(config, null, 2));
    }
  } catch (err) {
    const logger = new LoggerService();
    logger.error('Intrakit Launch Failed!', err);
  }
}

bootstrap();
