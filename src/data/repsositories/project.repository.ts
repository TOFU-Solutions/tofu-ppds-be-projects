import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseModelRepository } from 'src/utils/generics/repository.generic';
import { ProjectDocuemnt } from '../schemas/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectModel } from '../models/project.model';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name ProjectModelRepository
 * @description the repository for the project model
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseModelRepository<ProjectDocuemnt>
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class ProjectModelRepository extends BaseModelRepository<ProjectDocuemnt> {
  /**
   * @constructor
   * @param {Model<ProjectDocuemnt>} projects - the project model
   * @since 0.0.1
   */
  constructor(
    @InjectModel(ProjectModel.name)
    protected readonly projects: Model<ProjectDocuemnt>,
  ) {
    super(projects);
  }

  /**
   * @protected
   * @method bundle
   * @description bundles the data from the model to the entity
   * @param {any[]} args - the arguments to bundle
   * @returns {any
   * @since 0.0.1}
   */
  protected bundle(...args: any[]) {
    this.logger.debug(`bundle(): Enter`);
    this.logger.debug(`bundle(): args: ${JSON.stringify(args)}`);
    return plainToInstance(ProjectModel, args[0]);
  }

  /**
   * @protected
   * @method extract
   * @description extracts the data from the entity to the model for update
   * @param {any} source - the source to extract from
   * @returns {any
   * @since 0.0.1}
   */
  protected extract(source: any) {
    this.logger.debug(`extract(): Enter`);
    this.logger.debug(`extract(): source: ${JSON.stringify(source)}`);
    const keys = Object.keys(source);
    this.logger.debug(`extract(): keys: ${JSON.stringify(keys)}`);
    if (keys.length === 0) {
      throw new BadRequestException('No data provided');
    } else {
      const available = [
        'collection',
        'description',
        'name',
        'season',
        'status',
        'tags',
        'year',
      ];
      if (keys.every((key) => available.includes(key))) {
        return source;
      } else {
        throw new BadRequestException(`Invalid data provided: ${keys}`);
      }
    }
  }
}
