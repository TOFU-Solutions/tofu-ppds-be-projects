import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ClientCreateCommand } from '../../business/commands/client-create.command';
import { v4 as uuid } from 'uuid';
import { ClientListQuery } from '../../business/queries/client.list.query';
import { ClientAllQuery } from '../../business/queries/client.all.query';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name ClientController
 * @description the controller that handles the client routes
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Controller('clients')
@ApiTags('Clients')
export class ClientController {
  /**
   * @private
   * @readonly
   * @property {Logger} logger the logger for this class
   */
  private readonly logger = new Logger(`controller<client>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {CommandBus} service the command bus
   * @param {QueryBus} query the query bus
   * @since 0.0.1
   */
  constructor(
    private readonly service: CommandBus,
    private readonly query: QueryBus,
  ) {}

  /**
   * @method all
   * @description gets all the clients
   * @param {number} page the page number to get
   * @param {number} size the page size to get
   * @returns {Promise<any>} the result of the query
   * @since 0.0.1
   */
  all(@Query('p') page = 0, @Param('s') size = 25) {
    this.logger.debug(`all(): Enter`);
    this.logger.debug(`all(): page: ${page}`);
    this.logger.debug(`all(): size: ${size}`);
    const request = new ClientAllQuery(page, size);
    this.logger.debug(`all(): request: ${JSON.stringify(request)}`);
    return this.query.execute(request);
  }

  /**
   * @method create
   * @description creates a new client
   * @param {ClientCreateCommand} command the command to execute
   * @returns {Promise<any>} the result of the command
   * @since 0.0.1
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Creating a new client',
    description: 'Creating a new client',
  })
  @ApiBody({
    type: ClientCreateCommand,
  })
  create(@Body() command: ClientCreateCommand) {
    this.logger.debug(`create(): Enter`);
    this.logger.debug(`create(): command: ${JSON.stringify(command)}`);
    const request = plainToInstance(ClientCreateCommand, command);
    this.logger.debug(`create(): request: ${JSON.stringify(request)}`);
    return this.service.execute(request);
  }

  /**
   * @method list
   * @description lists the clients for a workspace
   * @param {string} workspace the workspace to list the clients for
   * @param {number} page the page number to collect from the list
   * @param {number} size the page size to collect from the list
   * @returns {Promise<any>} the result of the query
   * @since 0.0.1
   */
  @Get('workspaces/:workspace')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Getting available clients for a specific workspace',
  })
  @ApiParam({
    name: 'workspace',
    description: 'The workspace to get the clients for',
    type: 'string',
    required: true,
    example: uuid(),
  })
  @ApiQuery({
    name: 'p',
    description: 'The page number to get',
    type: 'number',
    required: false,
    example: 0,
  })
  @ApiParam({
    name: 's',
    description: 'The page size to get',
    type: 'number',
    required: false,
    example: 25,
  })
  list(
    @Param('workspace') workspace: string,
    @Query('p') page = 0,
    @Query('s') size = 25,
  ) {
    this.logger.debug(`list(): Enter`);
    this.logger.debug(`list(): workspace: ${workspace}`);
    this.logger.debug(`list(): page: ${page}`);
    this.logger.debug(`list(): size: ${size}`);
    const request = new ClientListQuery(workspace, page, size);
    this.logger.debug(`list(): request: ${JSON.stringify(request)}`);
    return this.query.execute(request);
  }
}
