import { Injectable } from '@nestjs/common';
import { BaseEntityService } from 'src/utils/generics/service.generic';
import { ClientEntity } from '../entities/client.entity';
import { ClientDocument } from 'src/domains/projects/data/schemas/client.schema';
import { ClientModelRepository } from 'src/domains/projects/data/repsositories/client.repository';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name ClientEntityService
 * @description the business logic for handling data entry for new client
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class ClientEntityService extends BaseEntityService<
  ClientEntity,
  ClientDocument
> {
  /**
   * @constructor
   * @param {ClientModelRepository} clients - the data repository for accessing the client document
   * @since 0.0.1
   */
  constructor(protected clients: ClientModelRepository) {
    super(clients);
  }

  /**
   * @protected
   * @method convert
   * @description Converting the inbound data to service enitty
   * @param {any[]} args - the arguments received
   * @returns {ClientEntity}
   * @since 0.0.1
   */
  protected convert(...args: any[]) {
    this.logger.debug(`convert(): Enter`);
    this.logger.debug(`convert(); args[0] = ${JSON.stringify(args[0])}`);
    if (!args[0]) return undefined;
    this.logger.debug(
      `convert(); args[0].type = ${JSON.stringify(args[0].constructor.name)}`,
    );
    switch (args[0].constructor.name) {
      default:
        return plainToInstance(
          ClientEntity,
          JSON.parse(JSON.stringify(args[0])),
        );
    }
  }

  /**
   * @protected
   * @method identify
   * @description the duplication identifiers for the object
   * @param {any} source - the source object to generate deduplication algo
   * @returns {any}
   * @since 0.0.1
   */
  protected identify(source: any) {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identity(): source = ${JSON.stringify(source)}`);
    return {
      code: source.code,
      workspace: source.workspace,
    };
  }
}
