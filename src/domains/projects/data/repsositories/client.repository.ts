import { BaseModelRepository } from 'src/utils/generics/repository.generic';
import { ClientDocument } from '../schemas/client.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientModel } from '../models/client.model';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { ProjectEntity } from 'src/domains/projects/business/entities/project.entity';

/**
 * @class
 * @name ClientModelRepository
 * @description the repository for the client model
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseModelRepository
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientModelRepository extends BaseModelRepository<ClientDocument> {
  /**
   * @constructor
   * @param {Model<ClientDocument>} clients - the client model
   * @since 0.0.1
   */
  constructor(
    @InjectModel(ClientModel.name)
    protected readonly clients: Model<ClientDocument>,
  ) {
    super(clients);
  }

  /**
   * @protected
   * @method bundle
   * @description bundles the data from the database into the model
   * @param {any[]} args - the data from the database
   * @returns {ClientModel} the model with the data from the database
   * @since 0.0.1
   */
  protected bundle(...args: any[]) {
    this.logger.debug('bundle(): Enter');
    this.logger.debug(`bundle(): args: ${JSON.stringify(args)}`);
    return plainToInstance(ClientModel, args[0]);
  }

  /**
   * @protected
   * @method extract
   * @description extracts the data from the model to be saved in the database
   * @param {ClientModel} source - the model to extract the data from
   * @returns {any} the data to be saved in the database
   * @since 0.0.1
   */
  protected extract(source: any) {
    this.logger.debug('extract(): Enter');
    this.logger.debug(`extract(): source: ${JSON.stringify(source)}`);
    const keys = Object.keys(source);
    this.logger.debug(`extract(): keys: ${JSON.stringify(keys)}`);
    if (keys.length === 0) {
      throw new BadRequestException('No data provided');
    } else {
      const available = ['description', 'name', 'isInternal', 'logo', 'owner'];
      if (keys.every((key) => available.includes(key))) {
        return source;
      } else {
        throw new BadRequestException(`Invalid data provided: ${keys}`);
      }
    }
  }

  /**
   * @method setProject
   * @description sets the projects for a client
   * @param {string} client - the id of the client to set the projects for
   * @param {ProjectEntity[]} projects - the projects to set
   * @returns {Promise<ClientModel>} the client with the projects set
   * @since 0.0.1
   */
  setProject(client: string, projects: ProjectEntity[]) {
    this.logger.debug('setProject(): Enter');
    this.logger.debug(`setProject(): client: ${JSON.stringify(client)}`);
    this.logger.debug(`setProject(): projects: ${JSON.stringify(projects)}`);
    try {
      return this.clients
        .findOneAndUpdate({ id: client }, { projects: projects }, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(`setProject(): error: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
