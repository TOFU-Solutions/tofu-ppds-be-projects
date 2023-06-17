import { Prop, Schema } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { ProjectStatus } from 'src/business/enums/project-status.enum';
import { BaseIndestructableModel } from 'src/utils/generics/model-undestructable.generic';

/**
 * @class
 * @name ProjectModel
 * @description the project entity for designers for a single season
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseIndestructableModel
 * @author Mark Leung <leungas@gmail.com>
 */
@Schema({
  collection: 'projects',
})
export class ProjectModel extends BaseIndestructableModel {
  /**
   * @property {string} collection - the collection the project belongs to
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
  })
  collection: string;

  /**
   * @property {string} description - the description of the project
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: false,
  })
  description?: string;

  /**
   * @property {string} name - the name of the project
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  /**
   * @property {string} owner - the owner of the project
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
    validate: [(v: string) => isUUID(v, '4'), 'The value needs to be an UUID'],
  })
  owner: string;

  /**
   * @property {string} season - the season of the project
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: false,
  })
  season?: string;

  /**
   * @property {ProjectStatus} status - the status of the project
   * @since 0.0.1
   */
  @Prop({
    type: String,
    enum: ['ACTIVE', 'ARCHIVED'],
    required: true,
    default: ProjectStatus.Active,
  })
  status: ProjectStatus;

  /**
   * @property {string[]} tags - the tags of the project
   * @since 0.0.1
   */
  @Prop({
    type: [String],
    default: [],
  })
  tags: string[] = [];

  /**
   * @property {number} year - the year of the project
   * @since 0.0.1
   */
  @Prop({
    type: Number,
    required: false,
  })
  year?: number;
}
