import { PartialType } from '@nestjs/swagger';
import { ClientCreateRequestObject } from './client.create.dto';

/**
 * @class
 * @name ClientUpdateRequestObject
 * @description the request object for updating a client
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientUpdateRequestObject extends PartialType(
  ClientCreateRequestObject,
) {}
