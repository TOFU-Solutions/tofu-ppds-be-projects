import { OmitType } from '@nestjs/swagger';
import { ProjectCreateRequestObject } from '../../applications/dto/project.create.dto';

/**
 * @class
 * @name ProjectCreateCommand
 * @description the command to create a new project under a specific workspace
 * @version 0.0.1
 * @since 0.0.1
 * @extends OmitType(ProjectCreateRequestObject)
 * @author Mark Leung <leungas@gmail.com>
 */
export class ProjectCreateCommand extends OmitType(
  ProjectCreateRequestObject,
  [] as const,
) {}
