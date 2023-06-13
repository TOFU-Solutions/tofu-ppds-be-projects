import { Injectable } from '@nestjs/common';

/**
 * @class
 * @name SystemService
 * @description Provides a service for the application.
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Injectable()
export class SystemService {
  /**
   * @method heartbeat
   * @description Returns a string to indicate that the service is running.
   * @returns {string} A string to indicate that the service is running.
   * @since 0.0.1
   */
  heartbeat(): string {
    return 'TOFU PPDS Project Service is RUNNING!';
  }
}
