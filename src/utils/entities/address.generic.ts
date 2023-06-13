import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * @class
 * @name AddressEntity
 * @description The entity that represents an address
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class AddressEntity {
  /**
   * @property {string} city - the city of the address
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'city',
    description: 'the city of the address',
    type: 'string',
    required: true,
    example: 'Sydney',
  })
  @IsNotEmpty()
  @IsDefined()
  city: string;

  /**
   * @property {string} country - the country of the address in ISO 3166-1 alpha-3 format
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'country',
    description: 'the country of the address in ISO 3166-1 alpha-3 format',
    type: 'string',
    required: true,
    example: 'AUS',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(3)
  @IsDefined()
  country: string;

  /**
   * @property {string} postCode - the post code of the address
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'postCode',
    description: 'the post code of the address',
    type: 'string',
    required: false,
    example: '2000',
  })
  @IsNotEmpty()
  @IsOptional()
  postCode?: string;

  /**
   * @property {string} state - the state of the address
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'state',
    description: 'the state of the address',
    type: 'string',
    required: false,
    example: 'NSW',
  })
  @IsNotEmpty()
  @IsOptional()
  state?: string;

  /**
   * @property {string} street - the street of the address
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'street',
    description: 'the street of the address',
    type: 'string',
    required: true,
    example: '123 Main Street',
  })
  @IsNotEmpty()
  @IsDefined()
  street: string;

  /**
   * @property {string} suburb - the suburb of the address
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'suburb',
    description: 'the suburb of the address',
    type: 'string',
    required: false,
    example: 'Sydney',
  })
  @IsNotEmpty()
  @IsOptional()
  suburb?: string;
}
