import { Module } from '@nestjs/common';
import { repositories } from './repsositories';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModel } from './models/client.model';
import { ClientModelSchema } from './schemas/client.schema';
import { ProjectModel } from './models/project.model';
import { ProjectModelSchema } from './schemas/project.schema';
import { DesignModel } from './models/design.model';
import { DesignModelSchema } from './schemas/design.schema';

/**
 * @module DataModule
 * @description the data module holds the data access layer within the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  exports: [...repositories],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ClientModel.name,
        useFactory: () => {
          const schema = ClientModelSchema;
          return schema;
        },
      },
      {
        name: DesignModel.name,
        useFactory: () => {
          const schema = DesignModelSchema;
          return schema;
        },
      },
      {
        name: ProjectModel.name,
        useFactory: () => {
          const schema = ProjectModelSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [...repositories],
})
export class DataModule {}
