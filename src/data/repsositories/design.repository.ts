import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseModelRepository } from 'src/utils/generics/repository.generic';
import { DesignDocument } from '../schemas/design.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DesignModel } from '../models/design.model';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name DesignModelRepository
 * @description the data access layer for the design related model
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseModelRepository<DesignDocument> the base model repository
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class DesignModelRepository extends BaseModelRepository<DesignDocument> {
  /**
   * @constructor
   * @param {Model<DesignDocument>} designs - the design model
   * @since 0.0.1
   */
  constructor(
    @InjectModel(DesignModel.name)
    protected readonly designs: Model<DesignDocument>,
  ) {
    super(designs);
  }

  /**
   * @protected
   * @method bundle
   * @description bundles the data into the destination
   * @param {any[]} args - the arguments to bundle
   * @returns {DesignDocument} the bundled data
   * @since 0.0.1
   */
  protected bundle(...args: any[]) {
    this.logger.debug(`bundle(): Enter`);
    this.logger.debug(`bundle(): args = ${JSON.stringify(args)}`);
    return plainToInstance(DesignModel, args[0]);
  }

  /**
   * @protected
   * @method extract
   * @description extracts the data from the source
   * @param {any} source - the source to extract the data from
   * @returns {DesignDocument} the extracted data
   * @since 0.0.1
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
        'artifacts',
        'commited',
        'designer',
        'description',
        'name',
        'tags',
      ];
      if (keys.every((key) => available.includes(key))) {
        return source;
      } else {
        throw new BadRequestException(`Invalid data provided: ${keys}`);
      }
    }
  }
}
