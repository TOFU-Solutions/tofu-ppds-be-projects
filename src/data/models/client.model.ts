import { Prop } from '@nestjs/mongoose';
import { ProjectEntity } from 'src/business/entities/project.entity';
import { i18n } from 'src/utils/entities/i18n.generic';
import { BaseIndestructableModel } from 'src/utils/generics/model-undestructable.generic';

/**
 * @class
 * @name ClientModel
 * @description the client refers to a customer or brand a project is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseIndestructableModel
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientModel extends BaseIndestructableModel {
  /**
   * @property {string} code - the code of the client
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
  })
  code: string;

  /**
   * @property {i18n[]} description - the description of the client
   * @since 0.0.1
   */
  @Prop({
    type: [
      {
        locale: {
          type: String,
          required: true,
          validate: [
            (v: string) => v.length === 2,
            'locale must be 2 characters long',
          ],
        },
        value: {
          type: String,
          required: false,
        },
      },
    ],
    required: false,
    default: [],
  })
  description: i18n[];

  /**
   * @property {any} logo - the logo of the client
   * @since 0.0.1
   */
  @Prop({
    required: false,
  })
  logo: any;

  /**
   * @property {string} name - the name of the client
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  /**
   * @property {boolean} isInternal - whether this client is internal or not
   * @since 0.0.1
   */
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isInternal: boolean;

  /**
   * @property {string} owner - the owner of this client
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: false,
  })
  owner: string;

  /**
   * @property {ProjectEntity[]} projects - the projects this client has
   * @since 0.0.1
   */
  @Prop({
    type: [
      {
        id: {
          type: String,
          required: true,
          unique: true,
        },
        collection: {
          type: String,
          required: true,
        },
        createdOn: {
          type: Date,
          default: Date.now,
          required: true,
        },
        description: [
          {
            locale: {
              type: String,
              required: true,
              validate: [
                (v: string) => v.length === 2,
                'locale must be 2 characters long',
              ],
            },
            value: {
              type: String,
              required: false,
            },
          },
        ],
        lastUpdatedOn: {
          type: Date,
          default: Date.now,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        owner: {
          type: String,
          required: false,
        },
        season: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          enum: ['ACTIVE', 'ARCHIVED'],
          default: 'ACTIVE',
          required: true,
        },
        tags: {
          type: [String],
          required: false,
          default: [],
        },
        year: {
          type: Number,
          required: false,
        },
      },
    ],
    default: [],
    required: false,
  })
  projects: ProjectEntity[];

  /**
   * @property {string} workspace - the workspace this client belongs to
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
  })
  workspace: string;
}
