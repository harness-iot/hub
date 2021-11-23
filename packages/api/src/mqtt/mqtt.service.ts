import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { MQTT_PROVIDER } from './mqtt.constants';

export const mqttProvider = {
  provide: MQTT_PROVIDER,
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    });
  },
  inject: [],
};
