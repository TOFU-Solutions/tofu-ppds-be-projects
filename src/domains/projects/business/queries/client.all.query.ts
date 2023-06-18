/**
 * @class
 * @name ClientAllQuery
 * @description the query to get all the clients
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientAllQuery {
  /**
   * @constructor
   * @param {number} page the page number to get
   * @param {number} size the page size to get
   * @since 0.0.1
   */
  constructor(public readonly page: number, public readonly size: number) {}
}
