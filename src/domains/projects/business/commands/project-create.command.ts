import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProjectCreateRequestObject } from '../../applications/dto/project.create.dto';
import { v4 as uuid } from 'uuid';
import { IsOptional, IsUUID } from 'class-validator';

/**
 * @class
 * @name ProjectCreateCommand
 * @description the command to create a new project under a specific workspace
 * @version 0.0.1
 * @since 0.0.1
 * @extends OmitType(ProjectCreateRequestObject)
 * @author Mark Leung <leungas@gmail.com>
 */
export class ProjectCreateCommand extends OmitType(ProjectCreateRequestObject, [
  'owner',
] as const) {
  /**
   * @property {string} owner the owner of the project
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'owner',
    description: 'the owner of the project',
    type: 'string',
    required: false,
    example: uuid(),
  })
  @IsUUID()
  @IsOptional()
  owner?: string;
}
