import { Injectable } from '@nestjs/common';
import { BaseEntityService } from 'src/utils/generics/service.generic';
import { DesignEntity } from '../entities/design.entity';
import { DesignDocument } from 'src/data/schemas/design.schema';
import { DesignModelRepository } from 'src/data/repsositories/design.repository';
import { plainToInstance } from 'class-transformer';

/**
 * @class
 * @name DesignEntityService
 * @description the business logic layer for the design entity
 * @version 0.0.1
 * @since 0.0.1
 * @extends BaseEntityService
 * @see {@link DesignEntity} for the entity
 * @see {@link DesignDocument} for the document
 * @see {@link DesignModelRepository} for the repository
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class DesignEntityService extends BaseEntityService<
  DesignEntity,
  DesignDocument
> {
  /**
   * @constructor
   * @param {DesignModelRepository} designs - the design repository
   * @since 0.0.1
   */
  constructor(protected readonly designs: DesignModelRepository) {
    super(designs);
  }

  /**
   * @protected
   * @method convert
   * @description converts the data from the source to the destination
   * @param {any[]} args - the arguments to convert
   * @returns {DesignEntity} the converted data
   * @since 0.0.1
   */
  protected convert(...args: any[]) {
    this.logger.debug(`convert(): Enter`);
    this.logger.debug(`convert(): args = ${JSON.stringify(args)}`);
    if (!args[0]) return undefined;
    switch (args[0].constructor.name) {
      default:
        return plainToInstance(DesignEntity, args[0]);
    }
  }

  /**
   * @protected
   * @method identify
   * @description identifies the data from the source
   * @param {any} source - the source to identify the data from
   * @returns {any} the identification query
   * @since 0.0.1
   */
  protected identify(source: any) {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identify(): source: ${JSON.stringify(source)}`);
    return {
      project: source.project,
      code: source.code,
    };
  }
}
