import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ClientEntity } from 'src/business/entities/client.entity';
import { ProjectCreateDataObject } from './project.create.dto';
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
   * @property {ProjectCreateDataObject} projects - the projects of the client
   * @since 0.0.1
   */
  @ApiProperty({
    name: 'projects',
    description: 'the projects of the client',
    type: ProjectCreateDataObject,
    required: false,
  })
  @IsObject()
  @IsInstance(ProjectCreateDataObject)
  @IsOptional()
  projects?: ProjectCreateDataObject;
}
