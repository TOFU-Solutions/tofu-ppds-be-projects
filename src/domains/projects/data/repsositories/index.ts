import { ClientModelRepository } from './client.repository';
import { DesignModelRepository } from './design.repository';
import { ProjectModelRepository } from './project.repository';

/**
 * @const {Array} repositories - array of repositories offered by this application
 * @since 0.0.1
 */
export const repositories = [
  ClientModelRepository,
  DesignModelRepository,
  ProjectModelRepository,
];
