/**
 * @interface PermissionScopeEntryInterface
 * @description interface for permission scope entry
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export interface PermissionScopeEntryInterface {
  /**
   * @property {string} name - name of the permission scope
   * @since 0.0.1
   */
  name: string;

  /**
   * @property {boolean} isAdminEnabled - indicates whether the permission is enabled for admin
   * @since 0.0.1
   */
  isAdminEnabled: boolean;
}

/**
 * @interface GenericPermissionInterface
 * @description interface for generic permission applicable for applications
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export interface GenericPermissionInterface {
  /**
   * @property {string} description - description of the permission
   * @since 0.0.1
   */
  description: string;

  /**
   * @property {string} name - name of the permission object
   * @since 0.0.1
   */
  name: string;

  /**
   * @property {PermissionScopeEntryInterface[]} permissions - list of permission scopes
   * @since 0.0.1
   */
  permissions: PermissionScopeEntryInterface[];
}
