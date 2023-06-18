import { HydratedDocument } from 'mongoose';
import { ProjectModel } from '../models/project.model';
import { SchemaFactory } from '@nestjs/mongoose';

/**
 * @type {ProjectDocument}
 * @since 0.0.1
 * @description the project document type
 * @typedef {HydratedDocument<ProjectModel>} ProjectDocument
 * @author Mark Leung <leungas@gmail.com>
 */
export type ProjectDocuemnt = HydratedDocument<ProjectModel>;

/**
 * @const {Schema<ProjectModel>} ProjectSchema - the schema for the project model
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export const ProjectModelSchema = SchemaFactory.createForClass(ProjectModel);
