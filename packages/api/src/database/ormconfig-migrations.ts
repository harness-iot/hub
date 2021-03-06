import { ConnectionOptions  } from 'typeorm';

const ormConfig: ConnectionOptions  = {
  type: 'sqlite',
  database: __dirname + '/../../../../../db/db.sqlite',
  entities: [__dirname + '/../../../common/dist/entities/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export default ormConfig;
