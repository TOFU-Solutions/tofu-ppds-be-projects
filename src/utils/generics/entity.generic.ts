import { ApiProperty } from '@nestjs/swagger';

/**
 * @abstract
 * @class
 * @name BaseEntity
 * @description the base entity for all logic entity for the service
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export abstract class BaseEntity {
  /**
   * @property {Date} createdOn - the date when the entity is first created
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'createdOn',
    description: 'Date when entity is first created',
    type: 'date',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  createdOn?: Date;

  /**
   * @property {Date} lastUpdatedOn - the date when the entity is last updated
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'lastUpdated',
    description: 'Date when entity is lastChanged',
    type: 'date',
    example: '2021-01-01T00:00:00.000Z',
    readOnly: true,
  })
  lastUpdatedOn?: Date;
}
