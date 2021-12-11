import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConditionalEntity } from '@harriot-hub/common';

// interface RedisInitiatorPayload {
//   channel?: number;
//   value: string;
//   value_type: string;
//   condition: string;
// }

@Injectable()
export class ConditionalService {
  logger = new Logger(ConditionalService.name);

  constructor(
    @InjectRepository(ConditionalEntity)
    protected readonly repository: Repository<ConditionalEntity>,
  ) {}

  // private async initializeNodeInitiators(conditionals: ConditionalEntity[]) {
  //   // Delay to allow for nodes to connect to hub so connectivity errors more accurate
  //   const NODE_CONNECTION_DELAY = 5000;
  //   setTimeout(() => {
  //     Promise.all(
  //       conditionals.map(async (conditional) => {
  //         if (!conditional.initiator_id) {
  //           return;
  //         }

  //         const nodeConnected = await this.cacheManager.get<string>(
  //           `node:${conditional.initiator_id}`,
  //         );

  //         if (nodeConnected === null) {
  //           await this.cacheManager.set(
  //             `conditional_initiator_error:${conditional.initiator_id}`,
  //             '',
  //             { ttl: 0 },
  //           );
  //         }

  //         // to do - send publish to node to activate
  //       }),
  //     );
  //   }, NODE_CONNECTION_DELAY);
  // }

  // async bootstrap(): Promise<void> {
  //   const activatedConditionals = await this.repository.find({
  //     where: { is_enabled: true, is_activated: true },
  //     relations: ['actions'],
  //   });

  //   await Promise.all(
  //     activatedConditionals.map(async (conditional) => {
  //       if (!conditional.initiator_id) {
  //         // to do: handle timer conditionals
  //         return;
  //       }

  //       const existingInitiatorStr = await this.cacheManager.get<string>(
  //         `initiator:${conditional.initiator_id}`,
  //       );

  //       const existingInitiator: RedisInitiatorPayload[] = existingInitiatorStr
  //         ? JSON.parse(existingInitiatorStr)
  //         : [];

  //       const payload: RedisInitiatorPayload[] = [
  //         {
  //           channel: conditional.initiator_type_channel,
  //           value: conditional.initiator_value,
  //           value_type: conditional.initiator_value_type,
  //           condition: conditional.initiator_condition,
  //         },
  //         ...existingInitiator,
  //       ];

  //       await this.cacheManager.set(
  //         `initiator:${conditional.initiator_id}`,
  //         JSON.stringify(payload),
  //         { ttl: 0 },
  //       );
  //     }),
  //   );

  //   await this.initializeNodeInitiators(activatedConditionals);
  // }
}
