import { OmitType } from '@nestjs/swagger';
import { ClientEntity } from '../entities/client.entity';

/**
 * @class
 * @name ClientCreateCommand
 * @description The command for managing creation of new clients
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientCreateCommand extends OmitType(ClientEntity, [] as const) {}
