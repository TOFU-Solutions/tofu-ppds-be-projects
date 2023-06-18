import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientUpdateCommand } from './client-update.command';
import { ClientEntityService } from '../services/client.service';
import { plainToInstance } from 'class-transformer';
import { ClientUpdateRequestObject } from '../../applications/dto/client.update.dto';
import { Logger } from '@nestjs/common';

/**
 * @class
 * @name ClientUpdateCommandHandler
 * @description the command handler that handles the update of a client
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@CommandHandler(ClientUpdateCommand)
export class ClientUpdateCommandHandler
  implements ICommandHandler<ClientUpdateCommand>
{
  /**
   * @private
   * @readonly
   * @property {Logger} logger the logger for this class
   */
  private readonly logger = new Logger(`handler<client-update>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {ClientService} service the client service
   * @since 0.0.1
   */
  constructor(private readonly service: ClientEntityService) {}
  /**
   * @async
   * @method execute
   * @param {ClientUpdateCommand} command the command to execute
   * @returns {Promise<any>} the result of the command
   * @since 0.0.1
   */
  async execute(command: ClientUpdateCommand): Promise<any> {
    this.logger.debug(`execute(): Enter`);
    this.logger.debug(`execute(): command: ${JSON.stringify(command)}`);
    const request = plainToInstance(ClientUpdateRequestObject, command);
    return this.service.update(command.id, request);
  }
}
