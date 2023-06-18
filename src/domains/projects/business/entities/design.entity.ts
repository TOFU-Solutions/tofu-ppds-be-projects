import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { FileEntity } from 'src/utils/entities/file.generic';
import { BaseCodedEntity } from 'src/utils/generics/entity-coded.entity';
import { v4 as uuid } from 'uuid';

/**
 * @class
 * @name DesignEntity
 * @description the design refers to a design a collection is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseEntity
 * @author Mark Leung <leungas@gmail.com>
 */
export class DesignEntity extends BaseCodedEntity {
  /**
   * @property {FileEntity[]} artifacts - the artifacts of the design
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'artifacts',
    description: 'the artifacts of the design',
    type: 'array',
    items: {
      type: 'FileEntity',
    },
    required: false,
    default: [],
    example: [],
  })
  @IsObject({ each: true })
  @IsOptional()
  artifacts: FileEntity[] = [];

  /**
   * @property {string} code - the code of the design
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'code',
    description: 'the code of the design',
    type: 'string',
    required: true,
    example: 'design-1',
  })
  @IsNotEmpty()
  @IsDefined()
  code: string;

  /**
   * @property {boolean} committed - is the design committed into order and production
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'committed',
    description: 'is the design committed into order and production',
    type: 'boolean',
    required: false,
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  committed = false;

  /**
   * @property {string} designer - the designer of the design
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'designer',
    description: 'the designer of the design',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  designer: string;

  /**
   * @property {i18n[]} description - the description of the design
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'description',
    description: 'the description of the design',
    type: 'array',
    items: {
      type: 'i18n',
    },
    required: false,
    default: [],
    example: 'Design Description',
  })
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  /**
   * @property {string} name - the name of the design
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'name',
    description: 'the name of the design',
    type: 'string',
    required: true,
    example: 'design-1',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsDefined()
  name: string;

  /**
   * @property {string} project - the project the design belongs to
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'project',
    description: 'the project the design belongs to',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  project: string;

  /**
   * @property {string[]} tags - the tags of the design
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'tags',
    description: 'the tags of the design',
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
}
