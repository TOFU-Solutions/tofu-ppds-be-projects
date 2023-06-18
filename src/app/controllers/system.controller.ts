import { Controller, Get } from '@nestjs/common';
import { SystemService } from '../../domains/projects/business/services/system.service';

/**
 * @class
 * @name SystemController
 * @description Provides a controller for the application.
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Controller()
export class SystemController {
  /**
   * @constructor
   * @param {SystemService} service - The service to use.
   * @since 0.0.1
   */
  constructor(private readonly service: SystemService) {}

  /**
   * @method healthcheck
   * @description Returns a string to indicate that the service is running.
   * @returns {string} A string to indicate that the service is running.
   * @since 0.0.1
   */
  @Get()
  healthcheck(): string {
    return this.service.heartbeat();
  }
}
