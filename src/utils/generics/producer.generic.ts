import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AsyncMessageInterface } from '../interfaces/message.interface';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

/**
 * @abstract
 * @class
 * @name BaseAmqpProducer
 * @description the base amqp producer to handle sending of AMQP messages
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 */
export abstract class BaseAmqpProducer {
  /**
   * @protected
   * @readonly
   * @property {Logger} logger - the logger for the producer
   */
  protected readonly logger = new Logger(`producer<${this.constructor.name}>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {AmqpConnection} client - the amqp connection
   * @param {ConfigService} config - the config service
   */
  constructor(
    protected readonly client: AmqpConnection,
    protected readonly config: ConfigService,
  ) {}

  /**
   * @protected
   * @method seal
   * @description seal the message
   * @param {any} message - the message to seal
   * @returns {AsyncMessageInterface} - the sealed message
   * @since 1.0.0
   */
  protected seal(action: string, message: any): AsyncMessageInterface {
    this.logger.debug(`seal(): Enter`);
    this.logger.debug(`seal(): action=${action}`);
    this.logger.debug(`seal(): message=${JSON.stringify(message)}`);
    return {
      id: uuid(),
      action: action,
      createdOn: new Date(),
      source: this.config.get<string>('app.name'),
      payload: message,
    };
  }

  /**
   * @protected
   * @method send
   * @description send the message
   * @param {string} destination - the destination
   * @param {AsyncMessageInterface} message - the message to send
   * @returns {void}
   * @since 1.0.0
   */
  protected async send(destination: string, action: string, message: any) {
    this.logger.debug(`send(): Enter`);
    this.logger.debug(`send(): destination=${destination}`);
    this.logger.debug(`send(): action=${action}`);
    this.logger.debug(`send(): message=${JSON.stringify(message)}`);
    try {
      const exchange = this.config.get<string>('integration.rabbitmq.root');
      this.logger.debug(`send(): exchange=${exchange}`);
      const sealed = this.seal(action, message);
      this.logger.debug(`send(): sealed=${JSON.stringify(sealed)}`);
      await this.client.managedChannel.waitForConnect(async () => {
        return this.client.publish(exchange, destination, sealed);
      });
    } catch (error) {
      this.logger.error(error);
      throw new error();
    }
  }
}
