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
import { ProjectEntity } from './project.entity';
import { BaseCodedEntity } from 'src/utils/generics/entity-coded.entity';

/**
 * @class
 * @name ClientEntity
 * @description the client refers to a customer or brand a project is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseCodedEntity
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientEntity extends BaseCodedEntity {
  /**
   * @property {string} code - the code of the client
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'code',
    description: 'the code of the client',
    type: 'string',
    required: true,
    example: 'client-1',
  })
  @IsNotEmpty()
  @IsDefined()
  code: string;

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
   * @property {ProjectEntity[]} projects - the projects this client has
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'projects',
    description: 'the projects this client has',
    type: 'array',
    items: {
      type: 'ProjectEntity',
    },
    required: false,
    default: [],
    example: [
      {
        id: uuid(),
        collection: 'project 1',
        createdOn: new Date().toISOString(),
        description: [
          { locale: 'en', value: 'Project Description' },
          { locale: 'ch', value: '項目描述' },
          { locale: 'jp', value: 'プロジェクトの説明' },
          { locale: 'zh', value: '項目描述' },
        ],
        lastUpdatedOn: new Date().toISOString(),
        name: 'Project Name',
        owner: uuid(),
        season: 'FW',
        tags: ['tag1', 'tag2'],
        year: 2021,
      },
    ],
  })
  @IsObject({ each: true })
  @IsOptional()
  projects: ProjectEntity[] = [];

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
