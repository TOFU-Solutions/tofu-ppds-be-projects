import { Injectable, Logger, MethodNotAllowedException } from '@nestjs/common';
import { Document, Model, Schema } from 'mongoose';

/**
 * @abstract
 * @class
 * @name BaseModelRepository
 * @description the base repository for data access logic applicable for the application
 * @version 0.0.1
 * @since 0.0.1
 */
@Injectable()
export abstract class BaseModelRepository<M extends Schema | Document> {
  /**
   * @protected
   * @readonly
   * @property {Logger} logger - the logger for the repository
   */
  protected readonly logger = new Logger(
    `repository<${this.constructor.name}>`,
    { timestamp: true },
  );

  /**
   * @constructor
   * @param {Model<M>} model - the model to be used by the repository
   */
  constructor(private readonly model: Model<M>) {}

  /**
   * @protected
   * @async
   * @method bundle
   * @description bundle the arguments to be passed to {@link create}
   * @param {...any[]} args - the arguments to be passed from {@link create}
   * @returns {Promise<Schema>} - the arguments to be passed back to {@link create}
   */
  protected abstract bundle(...args: any[]): any;

  /**
   * @protected
   * @abstract
   * @method extract
   * @description extract the attributes that are editable from the source
   * @param {any} source - the source to be extracted
   * @returns {any} - the extracted attributes
   * @since 0.0.1
   */
  protected abstract extract(source: any): any;

  /**
   * @protected
   * @method identify
   * @description identify the query to extract the identity of the entity
   * @param {any} entity - the entity to be identified
   * @returns {any} - the query for identity
   */
  protected identify(entity: any): any {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identify(): entity = ${JSON.stringify(entity)}`);
    return { id: entity.id };
  }

  /**
   * @async
   * @method create
   * @description create a new entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async create(...args: any[]) {
    this.logger.debug(`create(): Enter`);
    this.logger.debug(`create(): args = ${JSON.stringify(args)}`);
    const entity = await this.bundle(...args);
    this.logger.debug(`create(): entity = ${JSON.stringify(entity)}`);
    const model = new this.model(entity);
    return model.save();
  }

  /**
   * @async
   * @method get
   * @description get an entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async get(query: any) {
    this.logger.debug(`get(): Enter`);
    this.logger.debug(`get(): query = ${JSON.stringify(query)}`);
    return this.model.findOne(query).exec();
  }

  /**
   * @async
   * @method list
   * @description list entities based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async list(query: any) {
    this.logger.debug(`list(): Enter`);
    this.logger.debug(`list(): query = ${JSON.stringify(query)}`);
    return this.model.find(query).exec();
  }

  /**
   * @async
   * @method remove
   * @description remove an entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async remove(...args: any[]) {
    this.logger.debug(`remove(): Enter`);
    this.logger.debug(`remove(): args = ${JSON.stringify(args)}`);
    const query = this.identify(args[0]);
    this.logger.debug(`remove(): query = ${JSON.stringify(query)}`);
    const model = await this.model.findOne(query).exec();
    if (Reflect.get(model, 'deletedOn')) {
      throw new MethodNotAllowedException(
        'Attempting to delete an already deleted item',
      );
    } else {
      // TODO: handle soft delete
      return this.model.deleteOne(query).exec;
    }
  }

  /**
   * @async
   * @method update
   * @description update an entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async update(...args: any[]) {
    this.logger.debug(`update(): Enter`);
    this.logger.debug(`update(): args = ${JSON.stringify(args)}`);
    const query = this.identify(args[0]);
    this.logger.debug(`update(): query = ${JSON.stringify(query)}`);
    return this.model
      .updateOne(
        query,
        Object.assign(this.extract(args[0]), { lastUpdatedOn: Date.now() }),
        { new: true },
      )
      .exec();
  }
}
