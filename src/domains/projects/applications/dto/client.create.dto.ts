import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ClientEntity } from 'src/domains/projects/business/entities/client.entity';
import { ProjectCreateRequestObject } from './project.create.dto';
import { IsInstance, IsObject, IsOptional } from 'class-validator';

/**
 * @class
 * @name ClientCreateRequestObject
 * @description the client refers to a customer or brand a project is for
 * @version 0.0.1
 * @since 0.0.1
 * @extends OmitType<ClientEntity, []>
 * @author Mark Leung <leungas@gmail.com>
 */
export class ClientCreateRequestObject extends OmitType(ClientEntity, [
  'id',
  'projects',
  'createdOn',
  'lastUpdatedOn',
] as const) {
  /**
   * @property {ProjectCreateRequestObject} projects - the projects of the client
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'projects',
    description: 'the projects of the client',
    type: ProjectCreateRequestObject,
    required: false,
  })
  @IsObject()
  @IsInstance(ProjectCreateRequestObject)
  @IsOptional()
  projects?: ProjectCreateRequestObject;
}
