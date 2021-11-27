import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConditionalEntity } from '@harriot-hub/common';

@Injectable()
export class ConditionalService {
  logger = new Logger(ConditionalService.name);
  private _conditionals: ConditionalEntity[];

  constructor(
    @InjectRepository(ConditionalEntity)
    protected readonly repository: Repository<ConditionalEntity>,
  ) {
    this._conditionals = [];
  }

  get activated() {
    return this._conditionals;
  }

  async bootstrap(): Promise<void> {
    this._conditionals = await this.repository.find({
      where: { is_enabled: true, is_activated: true },
      relations: ['actions'],
    });
  }
}
