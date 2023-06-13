import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import { ApplicationSetupProducer } from './producers/setup.producer';

/**
 * @class
 * @name ApplicationLoaderService
 * @description The application loader service
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class ApplicationLoaderService {
  /**
   * @private
   * @readonly
   * @property {Logger} logger - the logger for the service
   */
  private readonly logger = new Logger(`service<application-loader>`, {
    timestamp: true,
  });

  /**
   * @constructor
   * @param {ConfigService} config - the config service
   */
  constructor(
    private readonly config: ConfigService,
    private readonly producer: ApplicationSetupProducer,
  ) {}

  /**
   * @private
   * @method fetch
   * @description fetch the application data
   * @returns {Promise<void>} - a promise that resolves to void
   * @since 1.0.0
   */
  private fetch() {
    this.logger.debug(`fetch(): Enter`);
    const directory = this.config.get<string>('app.setup.directory');
    const loader = this.config.get<string>('app.setup.application.loader');
    const url = `./dist/infrastructure/config/${directory}/${loader}`;
    this.logger.debug(`fetch(): url=${url}`);
    try {
      if (existsSync(url)) {
        const data = JSON.parse(readFileSync(url).toString('utf-8'));
        this.logger.debug(`fetch(): data=${JSON.stringify(data)}`);
        return data;
      } else {
        throw new NotFoundException(
          `Unable to load application loader data at ${url}`,
        );
      }
    } catch (error) {
      this.logger.error(`fetch(): error=${error.message}`);
      return undefined;
    }
  }

  /**
   * @public
   * @async
   * @method run
   * @description run the application loader
   * @returns {Promise<void>} - a promise that resolves to void
   * @since 1.0.0
   */
  async run() {
    this.logger.debug(`run(): Enter`);
    try {
      const configuration = this.fetch();
      this.logger.debug(
        `run(): configuration=${JSON.stringify(configuration)}`,
      );
      if (configuration) {
        await this.producer.onApplicationSetup(configuration);
      } else {
        return;
      }
    } catch (error) {
      this.logger.error(`run(): error=${error.message}`);
      return;
    }
  }
}
