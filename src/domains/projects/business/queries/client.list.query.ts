/**
 * @class
 * @name ClientListQuery
 * @description the query to list clients for a workspace
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientListQuery {
  /**
   * @constructor
   * @param {string} workspace the workspace to list the clients for
   * @param {number} page the page number to collect from the list
   * @param {number} size the page size to collect from the list
   * @since 0.0.1
   */
  constructor(
    public readonly workspace: string,
    public readonly page: number,
    public readonly size: number,
  ) {}
}
