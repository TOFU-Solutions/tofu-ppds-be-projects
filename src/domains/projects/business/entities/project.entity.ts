import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from 'src/utils/generics/entity.generic';
import { v4 as uuid } from 'uuid';
import { ProjectStatus } from '../enums/project-status.enum';
import { DesignEntity } from './design.entity';
import { BaseCodedEntity } from 'src/utils/generics/entity-coded.entity';

/**
 * @class
 * @name ProjectEntity
 * @description the project refers to a project a collection is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseEntity
 * @author Mark Leung <leungas@gmail.com>
 */
export class ProjectEntity extends BaseCodedEntity {
  /**
   * @property {string} collection - the collection the project belongs to
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'collection',
    description: 'the collection the project belongs to',
    type: 'string',
    required: true,
    example: 'collection-1',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsDefined()
  code: string;

  /**
   * @property {i18n[]} description - the description of the project
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'description',
    description: 'the description of the project',
    type: 'string',
    required: false,
    example: 'Project Description',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsOptional()
  description?: string;

  /**
   * @property {string} name - the name of the project
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'name',
    description: 'the name of the project',
    type: 'string',
    required: true,
    example: 'Project Name',
  })
  @IsNotEmpty()
  @MinLength(1)
  @MinLength(1)
  name: string;

  /**
   * @property {string} owner - the designer user that owns of the project
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'owner',
    description: 'the designer user that owns of the project',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  owner: string;

  /**
   * @property {string} season - the season the project belongs to
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'season',
    description: 'the season the project belongs to',
    type: 'string',
    required: true,
    example: 'season-1',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsOptional()
  season?: string;

  /**
   * @property {ProjectStatus} status - the status of the project
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'status',
    description: 'the status of the project',
    enum: ProjectStatus,
    required: false,
    default: ProjectStatus.Active,
    example: ProjectStatus.Active,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status: ProjectStatus = ProjectStatus.Active;

  /**
   * @property {string[]} tags - the tags of the project
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'tags',
    description: 'the tags of the project',
    type: 'array',
    items: {
      type: 'string',
    },
    required: false,
    default: [],
    example: ['tag-1', 'tag-2'],
  })
  @IsNotEmpty({ each: true })
  @MinLength(1, { each: true })
  @IsOptional()
  tags: string[] = [];

  /**
   * @property {number} year - the year the project belongs to
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'year',
    description: 'the year the project belongs to',
    type: 'number',
    required: false,
    example: 2021,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsOptional()
  year?: number;
}
