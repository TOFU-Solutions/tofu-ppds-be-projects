import { Prop, Schema } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { FileEntity } from 'src/utils/entities/file.generic';
import { BaseIndestructableModel } from 'src/utils/generics/model-undestructable.generic';

/**
 * @class
 * @name DesignEntity
 * @description the design refers to a design a collection is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseCodedEntity
 * @author Mark Leung <leungas@gmail.com>
 */
@Schema({
  collection: 'designs',
})
export class DesignModel extends BaseIndestructableModel {
  /**
   * @property {FileEntity[]} artifacts - the artifacts of the design
   * @since 0.0.1
   */
  @Prop({
    name: 'artifacts',
    description: 'the artifacts of the design',
    type: [
      {
        description: {
          type: String,
          required: false,
        },
        id: {
          type: String,
          required: true,
          validate: [
            (v: string) => isUUID(v, 4),
            'Valid should be an UUID value',
          ],
        },
        label: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  })
  artifacts: FileEntity[];

  /**
   * @property {string} code - the code of the design
   * @since 0.0.1
   */
  @Prop({
    name: 'code',
    description: 'the code of the design',
    type: String,
    required: true,
  })
  code: string;

  /**
   * @property {boolean} commited - is the design committed into order and production
   * @since 0.0.1
   */
  @Prop({
    name: 'committed',
    description: 'is the design committed into order and production',
    type: Boolean,
    default: false,
  })
  commited: boolean;

  /**
   * @property {string} designer - the designer of the design
   * @since 0.0.1
   */
  @Prop({
    name: 'designer',
    description: 'the designer of the design',
    type: String,
    required: true,
    validate: [(v: string) => isUUID(v, 4), 'Valid should be an UUID value'],
  })
  designer: string;

  /**
   * @property {string} description - the description of the design
   * @since 0.0.1
   */
  @Prop({
    name: 'description',
    description: 'the description of the design',
    type: String,
    required: false,
  })
  description: string;

  /**
   * @property {string} name - the name of the design
   * @since 0.0.1
   */
  @Prop({
    name: 'name',
    description: 'the name of the design',
    type: String,
    required: true,
  })
  name: string;

  /**
   * @property {string} project - the project the design belongs to
   * @since 0.0.1
   */
  @Prop({
    name: 'project',
    description: 'the project the design belongs to',
    type: String,
    required: true,
    validate: [(v: string) => isUUID(v, 4), 'Valid should be an UUID value'],
  })
  project: string;

  /**
   * @property {string[]} tags - the tags of the design
   * @since 0.0.1
   */
  @Prop({
    name: 'tags',
    description: 'the tags of the design',
    type: [String],
    default: [],
  })
  tags: string[];
}
