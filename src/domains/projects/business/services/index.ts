import { ClientEntityService } from './client.service';
import { DesignEntityService } from './design.service';
import { ProjectEntityService } from './project.service';
import { SystemService } from './system.service';

/**
 * @const {Array} services - array of service offered by this application
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export const services = [
  SystemService,
  ProjectEntityService,
  ClientEntityService,
  DesignEntityService,
];
