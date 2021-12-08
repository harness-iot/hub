import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'sqlite',
  database: '/home/ty/harriot/harriot.db',
  entities: ['/home/ty/harriot/packages/common/dist/entities/*{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export default ormConfig;
