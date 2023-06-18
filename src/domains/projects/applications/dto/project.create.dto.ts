import { OmitType } from '@nestjs/swagger';
import { ProjectEntity } from 'src/domains/projects/business/entities/project.entity';

/**
 * @class
 * @name ProjectCreateRequestObject
 * @description the project refers to a project a collection is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends OmitType<ProjectEntity, []>
 * @author Mark Leung <leungas@gmail.com>
 */
export class ProjectCreateRequestObject extends OmitType(ProjectEntity, [
  'id',
  'createdOn',
  'lastUpdatedOn',
  'owner',
  'status',
] as const) {}
