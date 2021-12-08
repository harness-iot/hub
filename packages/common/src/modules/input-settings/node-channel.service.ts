import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NodeInputSettingsEntity } from '../../entities';
import { SqliteCrudService } from '../../services';

@Injectable()
export class NodeInputSettingsEntityService extends SqliteCrudService<NodeInputSettingsEntity> {
  constructor(
    @InjectRepository(NodeInputSettingsEntity)
    protected readonly repository: Repository<NodeInputSettingsEntity>,
  ) {
    super(repository);
  }
}
