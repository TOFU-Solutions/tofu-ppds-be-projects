import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { FileEntity } from 'src/utils/entities/file.generic';
import { i18n } from 'src/utils/entities/i18n.generic';
import { BaseEntity } from 'src/utils/generics/entity.generic';
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
export class DesignEntity extends BaseEntity {
  artifacts: FileEntity[];

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
    example: [
      { locale: 'en', value: 'Design Description' },
      { locale: 'ch', value: '設計描述' },
      { locale: 'jp', value: 'デザインの説明' },
      { locale: 'zh', value: '设计描述' },
    ],
  })
  @IsNotEmpty({ each: true })
  @IsOptional()
  description: i18n[] = [];

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
