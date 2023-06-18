import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProjectCreateCommand } from '../../business/commands/project-create.command';
import { v4 as uuid } from 'uuid';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name ProjectController
 * @description the controller that handles the project routes
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Controller('projects')
@ApiTags('Projects')
export class ProjectController {
  /**
   * @private
   * @readonly
   * @property {Logger} logger the logger for this class
   */
  private readonly logger = new Logger(`controller<project>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {CommandBus} commands the command bus {@see https://docs.nestjs.com/recipes/cqrs}
   * @param {QueryBus} queries the query bus {@see https://docs.nestjs.com/recipes/cqrs}
   * @since 0.0.1
   */
  constructor(
    private readonly comamnds: CommandBus,
    private readonly queries: QueryBus,
  ) {}

  /**
   * @method create
   * @description creates a new project for a workspace
   * @param {string} workspace the workspace id
   * @param {ProjectCreateCommand} request the request object
   * @returns {Promise<any>}
   * @since 0.0.1
   */
  @Post('workspaces/:workspace')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Creates a new project for a workspace',
    description: 'Creates a new project for a workspace',
  })
  @ApiParam({
    name: 'workspace',
    description: 'the workspace id',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @ApiBody({
    type: ProjectCreateCommand,
  })
  create(
    @Param('workspace') workspace: string,
    @Body() request: ProjectCreateCommand,
  ) {
    this.logger.debug(`create(): Enter`);
    this.logger.debug(`create(): workspace = ${workspace}`);
    this.logger.debug(`create(): request = ${JSON.stringify(request)}`);
    const command = Object.assign(
      plainToInstance(ProjectCreateCommand, request),
      { owner: workspace },
    );
    this.logger.debug(`create(): command = ${JSON.stringify(command)}`);
    return this.comamnds.execute(command);
  }
}
