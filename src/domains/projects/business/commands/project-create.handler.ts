import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectCreateCommand } from './project-create.command';
import { Logger } from '@nestjs/common';
import { ProjectEntityService } from '../services/project.service';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name ProjectCreateCommandHandler
 * @description the command handler for the project create command
 * @implements {ICommandHandler<ProjectCreateCommand>}
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@CommandHandler(ProjectCreateCommand)
export class ProjectCreateCommandHandler
  implements ICommandHandler<ProjectCreateCommand>
{
  /**
   * @private
   * @readonly
   * @property {Logger} logger the logger for this class
   * @since 0.0.1
   */
  private readonly logger = new Logger(`command<project-create>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {ProjectEntityService} service the project service
   * @since 0.0.1
   */
  constructor(private readonly service: ProjectEntityService) {}

  /**
   * @async
   * @method execute
   * @description the method that executes the command
   * @param {ProjectCreateCommand} command the command to execute
   * @returns {Promise<any>}
   * @since 0.0.1
   */
  async execute(command: ProjectCreateCommand) {
    this.logger.debug(`execute(): Enter`);
    this.logger.debug(`execute(): command = ${JSON.stringify(command)}`);
    const request = plainToInstance(ProjectCreateCommand, command);
    this.logger.debug(`execute(): request = ${JSON.stringify(request)}`);
    return this.service.add(request);
  }
}
