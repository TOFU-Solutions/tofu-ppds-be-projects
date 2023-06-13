import { i18n } from '../entities/i18n.generic';

/**
 * @interface ApplicationEnvironmentInterface
 * @description the application environment interface, handling the environment list of the app registration
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungsa@gmail.com>
 */
export interface ApplicationEnvironmentInterface {
  /**
   * @property {i18n[]} decription - the description of the environment
   * @since 1.0.0
   */
  decription: i18n[];

  /**
   * @property {string} default - the default value of the environment
   * @since 1.0.0
   */
  default?: string;

  /**
   * @property {i18n[]} name - the name of the environment
   * @since 1.0.0
   */
  name: i18n[];

  /**
   * @property {string} key - the key of the environment
   * @since 1.0.0
   */
  key: string;
}

/**
 * @interface ApplicationPermissionInterface
 * @description the application permission interface, handling the permission list of the app registration
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 */
export interface ApplicationPermissionInterface {
  /**
   * @property {string} object - the object of the permission
   * @since 1.0.0
   */
  object: string;

  /**
   * @property {i18n[]} description - the permission description
   * @since 1.0.0
   */
  description: i18n[];

  /**
   * @property {i18n[]} name - the permission name
   * @since 1.0.0
   */
  name: i18n[];

  /**
   * @property {string[]} scopes - the scopes of the permission
   * @since 1.0.0
   */
  scopes: string[];
}

/**
 * @interface ApplicationRoleInterface
 * @description the application role interface, handling role of the app registration
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 */
export interface ApplicationRoleInterface {
  /**
   * @property {string} code - the role code
   * @since 1.0.0
   */
  code: string;

  /**
   * @property {i18n[]} description - the role description
   * @since 1.0.0
   */
  description: i18n[];

  /**
   * @property {i18n[]} name - the role name
   * @since 1.0.0
   */
  name: i18n[];
}

/**
 * @interface ApplicationSettingInterface
 * @description the application setting interface, handling the setting list of the app registration
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 */
export interface ApplicationSettingInterface {
  /**
   * @property {i18n[]} description - the setting description
   * @since 1.0.0
   */
  description: i18n[];

  /**
   * @property {i18n[]} label - the setting label
   * @since 1.0.0
   */
  label: i18n[];
  /**
   * @property {string} key - the setting key
   * @since 1.0.0
   */
  key: string;
}

/**
 * @interface ApplicationSetupInterface
 * @description the application setup interface, handling the application setup
 * @version 1.0.0
 * @since 1.0.0
 * @author Mark Leung <leungas@gmail.com>
 * @see {@link ApplicationRoleInterface}
 */
export interface ApplicationSetupInterface {
  /**
   * @property {string} application - the application code
   * @since 1.0.0}
   */
  application: string;

  /**
   * @property {ApplicationEnvironmentInterface[]} enviroments - the application environments
   * @since 1.0.0
   */
  enviroments?: ApplicationEnvironmentInterface[];

  /**
   * @poperty {ApplicationPermissionInterface[]} permissions - the application permissions
   * @since 1.0.0
   */
  permissions?: ApplicationPermissionInterface[];

  /**
   * @property {ApplicationRoleInterface[]} roles - the application roles
   * @since 1.0.0
   */
  roles?: ApplicationRoleInterface[];

  /**
   * @property {ApplicationSettingInterface[]} settings - the application settings
   * @since 1.0.0
   */
  settings?: ApplicationSettingInterface[];
}
