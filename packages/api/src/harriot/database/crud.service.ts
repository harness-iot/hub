import { HttpException, HttpStatus } from '@nestjs/common';
import { validate, ValidatorOptions } from 'class-validator';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { BaseEntity } from './base.entity';

export class CrudService<T extends BaseEntity> {
  protected repository?: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  public async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  public async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  public async findOneOrFail(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOneOrFail(options);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.repository.create(data);

    await this.validate(entity, {
      groups: ['save'],
    });

    return this.repository.save(data);
  }

  // public async update(data: DeepPartial<T> | T): Promise<T> {
  //   const id = String(data.id || '');

  //   let entity: T;
  //   if (data instanceof BaseEntity) {
  //     entity = data;
  //   } else {
  //     entity = await this.repository.findOneOrFail(id);

  //     const { id: dataId, ...rest } = data;
  //     this.repository.merge(entity, rest as DeepPartial<T>);
  //   }

  //   await this.validate(entity, {
  //     groups: ['update'],
  //   });
  //   return entity.save();
  // }

  protected async validate(entity: T, options?: ValidatorOptions) {
    const errors = await validate(entity, {
      validationError: {
        target: false,
        value: false,
      },
      options,
    } as ValidatorOptions);

    if (errors.length > 0) {
      throw new HttpException(
        { message: errors, error: 'Validation' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
