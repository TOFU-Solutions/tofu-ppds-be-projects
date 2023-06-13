/**
 * @interface ApplicationStartupLoaderInterface
 * @description interface for application startup loader
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export interface ApplicationStartupLoaderInterface {
  /**
   * @method run
   * @description running the loader to perform application startup
   * @returns {Promise<void>}
   */
  run(): Promise<void>;
}
