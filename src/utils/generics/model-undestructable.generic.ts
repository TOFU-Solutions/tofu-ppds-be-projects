import { Prop } from '@nestjs/mongoose';
import { BaseModel } from './model.generic';

/**
 * @abstract
 * @class
 * @name BaseIndestructableModel
 * @description The model applicable as the base class for all mongoose models that are indestructable
 * @version 0.0.1
 * @since 0.0.1
 * @extends {BaseModel}
 * @author Mark Leung <leungas@gmail.com>
 */
export abstract class BaseIndestructableModel extends BaseModel {
  /**
   * @property {Date} deletedOn - the date when the entity is deleted
   */
  @Prop({
    nullable: true,
  })
  deletedOn: Date;
}
