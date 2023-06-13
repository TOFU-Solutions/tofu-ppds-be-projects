import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseAmqpProducer } from 'src/utils/generics/producer.generic';
import { GenericPermissionInterface } from 'src/utils/interfaces/permission.interface';

/**
 * @class
 * @name ApplicationSetupProducer
 * @description the class that produces the application setup signals
 * @version 1.0.0
 * @since 1.0.0
 * @extends {BaseProducer}
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class ApplicationSetupProducer extends BaseAmqpProducer {
  /**
   * @protected
   * @property {string} topic - the topic to which the message belongs
   * @since 1.0.0
   */
  protected readonly topic = 'common.application.setup';

  /**
   * @constructor
   * @param {AmqpConnection} client - the amqp connection
   * @param {ConfigService} config - the config service
   */
  constructor(
    protected readonly client: AmqpConnection,
    protected readonly config: ConfigService,
  ) {
    super(client, config);
  }

  /**
   * @async
   * @method onApplicationSetup
   * @description the method that sends the permission setup message off to access service
   * @param {GenericPermissionInterface[]} permissions - the permissions to be setup
   * @returns {Promise<void>}
   */
  onApplicationSetup(permissions: GenericPermissionInterface[]) {
    this.logger.debug(`onPermissionSetup(): Enter`);
    this.logger.debug(
      `onPermissionSetup(): permissions = ${JSON.stringify(permissions)}`,
    );
    try {
      const envelop = Object.assign(permissions, {
        application: this.config.get('app.namespace'),
      });
      this.logger.debug(
        `onPermissionSetup(): envelop = ${JSON.stringify(envelop)}`,
      );
      return this.send(this.topic, 'others', envelop);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
