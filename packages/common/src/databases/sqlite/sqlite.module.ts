import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const test = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [],
  synchronize: true,
});

@Module({
  imports: [test],
})
export class SqliteModule {}
