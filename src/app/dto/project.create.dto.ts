import { OmitType } from '@nestjs/swagger';
import { ProjectEntity } from 'src/business/entities/project.entity';

/**
 * @class
 * @name ProjectCreateDataObject
 * @description the project refers to a project a collection is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends OmitType<ProjectEntity, []>
 * @author Mark Leung <leungas@gmail.com>
 */
export class ProjectCreateDataObject extends OmitType(ProjectEntity, [
  'createdOn',
  'lastUpdatedOn',
  'designs',
  'status',
] as const) {}
