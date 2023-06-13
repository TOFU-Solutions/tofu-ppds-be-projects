import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

/**
 * @class
 * @name i18n
 * @description The i18n object to facilitate the internationalisation of the data
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 */
export class i18n {
  /**
   * @property {string} locale The locale of the value
   * @since 1.0.0
   */
  @ApiProperty({
    name: 'locale',
    description: 'The locale of the value',
    type: 'string',
    required: true,
    example: 'en',
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  @IsDefined()
  locale: string;

  /**
   * @property {string} value The text label represent the value of that locale to show
   * @since 1.0.0
   */
  @ApiProperty({
    name: 'value',
    description: 'The text label represent the value of that locale to show',
    type: 'string',
    required: true,
    example: 'Some display label',
  })
  @IsNotEmpty()
  @IsDefined()
  value: string;
}
