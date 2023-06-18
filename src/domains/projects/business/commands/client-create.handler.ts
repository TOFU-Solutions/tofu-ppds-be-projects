import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientCreateCommand } from './client-create.command';
import { ClientEntityService } from '../services/client.service';
import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ClientCreateRequestObject } from '../../applications/dto/client.create.dto';

/**
 * @class
 * @name ClientCreateCommandHandler
 * @description The command handler for the ClientCreateCommand
 * @version 0.0.1
 * @since 0.0.1
 * @see {@link ClientCreateCommand}
 * @see {@link ClientEntityService}
 * @see {@link Logger}
 * @author Mark Leung <leungas@gmail.com>
 */
@CommandHandler(ClientCreateCommand)
export class ClientCreateCommandHandler
  implements ICommandHandler<ClientCreateCommand>
{
  /**
   * @private
   * @readonly
   * @property {Logger} logger - The logger instance
   * @since 0.0.1
   */
  private readonly logger = new Logger(`handler<client-create>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {ClientEntityService} service - The service to handle the command
   * @since 0.0.1
   */
  constructor(private readonly service: ClientEntityService) {}

  /**
   * @async
   * @method execute
   * @description The main method for handling the command
   * @param {ClientCreateCommand} command - The command to be handled
   * @returns {Promise<void>} - A promise that resolves to void
   * @since 0.0.1
   */
  async execute(command: ClientCreateCommand) {
    this.logger.debug(`execute(): Enter`);
    this.logger.debug(`execute(): command: ${JSON.stringify(command)}`);
    const request = plainToInstance(ClientCreateRequestObject, command);
    return this.service.add(request);
  }
}
