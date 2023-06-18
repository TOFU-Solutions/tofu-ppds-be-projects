import { HydratedDocument } from 'mongoose';
import { DesignModel } from '../models/design.model';
import { SchemaFactory } from '@nestjs/mongoose';

/**
 * @type {DesignDocument}
 * @description the design document
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export type DesignDocument = HydratedDocument<DesignModel>;

/**
 * @const {Schema} DesignModelSchema - the schema of the design model
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export const DesignModelSchema = SchemaFactory.createForClass(DesignModel);
