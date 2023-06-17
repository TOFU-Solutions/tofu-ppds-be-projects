import { Prop, Schema } from '@nestjs/mongoose';
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
@Schema({
  collection: 'clients',
})
export class ClientModel extends BaseIndestructableModel {
  /**
   * @property {string} code - the code of the client
   * @since 0.0.1
   */
  @Prop({
    type: String,
    index: true,
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
   * @property {string} workspace - the workspace this client belongs to
   * @since 0.0.1
   */
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  workspace: string;
}
