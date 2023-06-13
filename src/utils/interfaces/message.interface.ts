/**
 * @interface AsyncMessageInterface
 * @description The interface for the async message between services
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export interface AsyncMessageInterface {
  /**
   * @property {string} id - the unique id of the message
   */
  id: string;

  /**
   * @property {string} action - the action of the message
   */
  action: string;

  /**
   * @property {Date} createdOn - the date the message is created
   */
  createdOn: Date;

  /**
   * @property {string} source - the source of the message
   */
  source: string;

  /**
   * @property {string} destination - the destination of the message
   */
  payload: any;
}
