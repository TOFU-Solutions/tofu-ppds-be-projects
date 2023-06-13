import { Prop } from '@nestjs/mongoose';

/**
 * @abstract
 * @class
 * @name BaseModel
 * @description The model applicable as the base class for all mongoose models
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export abstract class BaseModel {
  /**
   * @property {string} id - the id of the entity
   * @since 0.0.1
   */
  @Prop()
  id: string;

  /**
   * @property {Date} createdOn - the date when the entity is first created
   * @since 0.0.1
   */
  @Prop({
    default: Date.now(),
  })
  createdOn: Date;

  /**
   * @property {Date} lastUpdatedOn - the date when the entity is last updated
   * @since 0.0.1
   */
  @Prop({
    default: Date.now(),
  })
  lastUpdatedOn: Date;
}
