import { HydratedDocument } from 'mongoose';
import { ClientModel } from '../models/client.model';
import { SchemaFactory } from '@nestjs/mongoose';

/**
 * @type {ClientDocument}
 * @description the hydrated document for the client model
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export type ClientDocument = HydratedDocument<ClientModel>;

/**
 * @const {Schema} ClientModelSchema - the schema for the client model
 * @since 0.0.1
 */
export const ClientModelSchema = SchemaFactory.createForClass(ClientModel);
