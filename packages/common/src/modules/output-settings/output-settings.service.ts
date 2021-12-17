import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodeOutputSettingsEntity } from '../../entities';
import { SqliteCrudService } from '../../services';

@Injectable()
export class NodeOutputSettingsEntityService extends SqliteCrudService<NodeOutputSettingsEntity> {
  constructor(
    @InjectRepository(NodeOutputSettingsEntity)
    protected readonly repository: Repository<NodeOutputSettingsEntity>,
  ) {
    super(repository);
  }
}
