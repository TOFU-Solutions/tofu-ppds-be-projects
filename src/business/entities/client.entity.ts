import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { i18n } from 'src/utils/entities/i18n.generic';
import { BaseEntity } from 'src/utils/generics/entity.generic';
import { v4 as uuid } from 'uuid';

/**
 * @class
 * @name ClientEntity
 * @description the client refers to a customer or brand a project is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseEntity
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientEntity extends BaseEntity {
  /**
   * @property {string} description - the description of the client
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'description',
    description: 'the description of the client',
    type: 'array',
    items: {
      type: 'i18n',
    },
    required: false,
    example: [
      { locale: 'en', value: 'Client Description' },
      { locale: 'ch', value: '客戶描述' },
      { locale: 'jp', value: 'クライアントの説明' },
      { locale: 'zh', value: '客戶描述' },
    ],
  })
  @IsObject({ each: true })
  @IsOptional()
  description: i18n[];

  /**
   * @property {string} logo - the logo of the client
   * @since 0.0.1
   */
  logo: any;

  /**
   * @property {string} name - the name of the client
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'name',
    description: 'the name of the client',
    type: 'string',
    required: true,
    example: 'Client Name',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  /**
   * @property {boolean} isInternal - whether this client is internal or not
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'isInternal',
    description: 'whether this client is internal or not',
    type: 'boolean',
    required: false,
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isInternal?: boolean = false;

  /**
   * @property {string} owner - the project owner of this client
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'owner',
    description: 'the project owner of this client',
    type: 'string',
    required: false,
    example: uuid(),
  })
  @IsUUID()
  @IsOptional()
  owner?: string;

  /**
   * @property {string} workspace - the workspace this client belongs to
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'workspace',
    description: 'the workspace this client belongs to',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  workspace: string;
}
