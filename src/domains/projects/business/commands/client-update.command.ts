import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ClientCreateCommand } from './client-create.command';
import { v4 as uuid } from 'uuid';
import { IsDefined, IsUUID } from 'class-validator';

/**
 * @class
 * @name ClientUpdateCommand
 * @description the command that defines the properties that can be updated for a client
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientUpdateCommand extends PartialType(ClientCreateCommand) {
  /**
   * @property {string} id the id of the client to update
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'id',
    description: 'the id of the client to update',
    type: 'stirng',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  id: string;
}
