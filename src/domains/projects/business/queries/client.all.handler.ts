import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientListQuery } from './client.list.query';
import { ClientEntityService } from '../services/client.service';
import { Logger } from '@nestjs/common';

/**
 * @class
 * @name ClientListQueryHandler
 * @description the query handler for client list
 * @implements {IQueryHandler<ClientListQuery>}
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@QueryHandler(ClientListQuery)
export class ClientListQueryHandler implements IQueryHandler<ClientListQuery> {
  /**
   * @private
   * @readonly
   * @property {Logger} logger - the logger for the class
   * @since 0.0.1
   */
  private readonly logger = new Logger(`query<client-list>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {ClientEntityService} service - the query service for client
   * @since 0.0.1
   */
  constructor(private readonly service: ClientEntityService) {}

  /**
   * @async
   * @method execute
   * @description the method to execute the query
   * @param {ClientListQuery} query - the query to execute
   * @returns {Promise<any[]>}
   */
  async execute(query: ClientListQuery) {
    this.logger.debug(`execute(): Enter`);
    this.logger.debug(`execute(): query = ${JSON.stringify(query)}`);
    return this.service.list({ owner: query.workspace });
  }
}
