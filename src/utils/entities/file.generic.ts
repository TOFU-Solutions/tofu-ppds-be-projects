import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { v4 as uuid } from 'uuid';

/**
 * @class
 * @name FileEntity
 * @description The entity representing an uploadable file in the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class FileEntity {
  /**
   * @property {string} description - the description to display for the file, if not provided the type is used
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'description',
    description:
      'the description to display for the file, if not provided the type is used',
    type: 'string',
    required: false,
    example: '3D Design File',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsOptional()
  description?: string;

  /**
   * @property {string} id - the id index of the file, refer to file service for file lookup
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'id',
    description:
      'the id index of the file, refer to file service for file lookup',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  id: string;

  /**
   * @property {string} label - the label to display for the file, if not provided the type is used
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'label',
    description:
      'the label to display for the file, if not provided the type is used',
    type: 'string',
    required: false,
    example: '3D Design File',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsOptional()
  label?: string;

  /**
   * @property {string} type - the type of file for the application
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'type',
    description: 'the type of file for the application',
    type: 'string',
    required: true,
    example: '3D Design File',
  })
  @IsNotEmpty()
  @MinLength(1)
  @IsDefined()
  type: string;
}
