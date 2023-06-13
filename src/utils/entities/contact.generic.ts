import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

/**
 * @class
 * @name ContactEntity
 * @description The entity that represents a contact
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class ContactEntity {
  /**
   * @property {string} email - the email of the contact
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'email',
    description: 'the email of the contact',
    type: 'string',
    required: true,
    example: 'john.smith@costono.com',
  })
  @IsEmail()
  @IsDefined()
  email: string;

  /**
   * @property {string} firstName - the first name of the contact
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'firstName',
    description: 'the first name of the contact',
    type: 'string',
    required: true,
    example: 'John',
  })
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  /**
   * @property {string} lastName - the last name of the contact
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'lastName',
    description: 'the last name of the contact',
    type: 'string',
    required: true,
    example: 'Smith',
  })
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  /**
   * @property {string} token - the token of the contact
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'token',
    description: 'the token of the contact',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @IsUUID()
  @IsDefined()
  token: string;
}
