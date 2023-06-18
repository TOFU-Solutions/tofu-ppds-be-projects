import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProjectEntity } from '../entities/project.entity';
import { ClientEntity } from '../entities/client.entity';
import { BaseEntityService } from 'src/utils/generics/service.generic';
import { ProjectDocuemnt } from 'src/domains/projects/data/schemas/project.schema';
import { ProjectModelRepository } from 'src/domains/projects/data/repsositories/project.repository';
import { ClientEntityService } from './client.service';

/**
 * @class
 * @name ProjectService
 * @description The service for handling project data
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class ProjectEntityService extends BaseEntityService<
  ProjectEntity,
  ProjectDocuemnt
> {
  /**
   * @constructor
   * @param {ProjectModelRepository} projects
   * @param {ClientEntityService} clients
   * @since 0.0.1
   */
  constructor(
    protected readonly clients: ClientEntityService,
    protected readonly projects: ProjectModelRepository,
  ) {
    super(projects);
  }

  /**
   * @protected
   * @method convert
   * @description converts the data from the model to the entity
   * @param {any[]} args - the arguments to convert
   * @returns {ClientEntity | ProjectEntity}
   * @since 0.0.1
   */
  protected convert(...args: any[]) {
    this.logger.debug(`convert(): Enter`);
    this.logger.debug(`convert(): args: ${JSON.stringify(args)}`);
    if (!args[0]) return undefined;
    switch (args[0].constructor?.name) {
      case 'ClientDocument':
        return plainToInstance(ClientEntity, args[0]);
      default:
        return plainToInstance(ProjectEntity, args[0]);
    }
  }

  /**
   * @protected
   * @method identify
   * @description generate the matching query for deduplication
   * @param {any} source - the source to identify
   * @returns {any}
   * @since 0.0.1
   */
  protected identify(source: any) {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identify(): source: ${JSON.stringify(source)}`);
    return {
      owner: source.owner,
      collection: source.collection,
    };
  }
}
