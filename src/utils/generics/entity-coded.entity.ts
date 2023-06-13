import { BaseEntity } from './entity.generic';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

/**
 * @abstract
 * @class
 * @name BaseCodedEntity
 * @description the base entity for all logic entity for the service
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseEntity
 * @author Mark Leung <leungas@gmail.com>
 */
export abstract class BaseCodedEntity extends BaseEntity {
  /**
   * @property {string} code - the code of the entity
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'id',
    description: 'the id of the entity',
    type: 'string',
    readOnly: true,
    example: uuid(),
  })
  id: string = uuid();
}
