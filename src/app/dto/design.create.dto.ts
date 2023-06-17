import { OmitType } from '@nestjs/swagger';
import { DesignEntity } from 'src/business/entities/design.entity';

/**
 * @class
 * @name DesignCreateRequestObject
 * @description the design refers to a design a collection is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends OmitType<DesignEntity, []>
 * @author Mark Leung <leungas@gmail.com>
 */
export class DesignCreateRequestObject extends OmitType(DesignEntity, [
  'createdOn',
  'lastUpdatedOn',
  'committed',
] as const) {}
