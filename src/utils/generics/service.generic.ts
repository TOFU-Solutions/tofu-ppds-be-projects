import {
  ConflictException,
  Logger,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { BaseEntity } from './entity.generic';
import { BaseModelRepository } from './repository.generic';
import { Document, Schema } from 'mongoose';
import { BaseIndestructableModel } from './model-undestructable.generic';

/**
 * @abstract
 * @class
 * @name BaseEntityService
 * @description the base service for all logic entity for the service
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export abstract class BaseEntityService<
  T extends BaseEntity,
  M extends Schema | Document,
> {
  /**
   * @protected
   * @readonly
   * @property {Logger} logger - the logger for the service
   */
  protected readonly logger = new Logger(`service<${this.constructor.name}?`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {BaseModelRepository<M>} repository - the repository to be used by the service
   */
  constructor(protected readonly repository: BaseModelRepository<M>) {}

  /**
   * @protected
   * @abstract
   * @method convert
   * @description convert the source to the entity needed within the application
   * @param {any} source - the source to be converted
   * }
   */
  protected abstract convert(...args: any[]);

  /**
   * @protected
   * @abstract
   * @method identify
   * @description identify the entity from the source
   * @param {any} source - the source to be identified
   * @returns {any} - the query applicable to identify the entity
   * @since 0.0.1
   */
  protected identify(source: any): any {
    this.logger.debug(`identify(): Enter`);
    this.logger.debug(`identify(): source = ${JSON.stringify(source)}`);
    return { id: typeof source === 'object' ? source.id : source };
  }

  /**
   * @protected
   * @async
   * @method isDuplicate
   * @description check if the entity is a duplicate
   * @param {...any[]} args - the arguments to be passed to {@link find}
   * @returns {Promise<boolean>} - true if the entity is a duplicate, false otherwise
   * @since 0.0.1
   */
  protected async isDuplicate(...args: any[]) {
    this.logger.debug(`isDuplicate(): Enter`);
    this.logger.debug(`isDuplicate(): args = ${JSON.stringify(args)}`);
    const exists = await this.get(...args);
    return exists ? true : false;
  }

  /**
   * @abstract
   * @method add
   * @description add a new entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async add(...args: any[]): Promise<T> {
    this.logger.debug(`add(): Enter`);
    this.logger.debug(`add(): args = ${JSON.stringify(args)}`);
    if (await this.isDuplicate(...args)) {
      throw new ConflictException(`Entity already defined.`);
    } else {
      const entity = this.convert(...args);
      this.logger.debug(`add(): entity = ${JSON.stringify(entity)}`);
      const result = await this.repository.create(entity);
      this.logger.debug(`add(): result = ${JSON.stringify(result)}`);
      return this.convert(result);
    }
  }

  /**
   * @abstract
   * @method find
   * @description locate a specific entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T[]>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async get(...args: any[]): Promise<T> {
    this.logger.debug(`get(): Enter`);
    this.logger.debug(`get(): args = ${JSON.stringify(args)}`);
    const result = await this.repository.get(this.identify(args[0]));
    this.logger.debug(`get(): result = ${JSON.stringify(result)}`);
    return result ? this.convert(result) : undefined;
  }

  /**
   * @abstract
   * @method list
   * @description list all entities based on the query supplied
   * @param {any} query - the query to be passed to the method
   * @returns {Promise<T[]>} - the list of entities if found, null otherwise
   * @since 0.0.1
   */
  async list(query: any, page?: number, size?: number): Promise<T[]> {
    this.logger.debug(`list(): Enter`);
    this.logger.debug(`list(): query = ${JSON.stringify(query)}`);
    if (size) {
      Reflect.set(query, 'limit', size);
      if (page) {
        Reflect.set(query, 'skip', page * size);
      }
    }
    const models = await this.repository.list(query);
    this.logger.debug(`list(): models = ${JSON.stringify(models)}`);
    return models.map((model) => this.convert(model));
  }

  /**
   * @abstract
   * @method remove
   * @description remove an entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async remove(...args: any[]) {
    this.logger.debug(`remove(): Enter`);
    this.logger.debug(`remove(): args = ${JSON.stringify(args)}`);
    const model = await this.get(args[0]);
    if (!model) {
      throw new NotFoundException();
    } else {
      if (model instanceof BaseIndestructableModel) {
        if (model.deletedOn) {
          throw new MethodNotAllowedException();
        } else {
          const mutation = Object.assign(args[0], { deletedOn: Date.now() });
          await this.update(mutation);
        }
      } else {
        await this.repository.remove(model);
      }
    }
  }

  /**
   * @abstract
   * @method update
   * @description update an entity based on the arguments supplied
   * @param {...any[]} args - the arguments to be passed to the method
   * @returns {Promise<T>} - the entity if found, null otherwise
   * @since 0.0.1
   */
  async update(...args: any[]): Promise<T> {
    this.logger.debug(`update(): Enter`);
    this.logger.debug(`update(): args = ${JSON.stringify(args)}`);
    const model = await this.get(this.identify(args[0]));
    this.logger.debug(`update(): model = ${JSON.stringify(model)}`);
    if (!model)
      throw new NotFoundException(`The entity does not exists in persistence`);
    const mutation = Object.assign(this.convert(model), args[0]);
    this.logger.debug(`update(): mutation = ${JSON.stringify(mutation)}`);
    const result = await this.repository.update(mutation);
    this.logger.debug(`update(): result = ${JSON.stringify(result)}`);
    return this.convert(mutation);
  }
}
