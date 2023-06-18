import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { BusinessModule } from './business/business.module';
import { DataModule } from './data/data.module';

/**
 * @module ProjectsModule,
 * @description the projects module holds the projects domain within the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  exports: [ApplicationsModule, BusinessModule, DataModule],
  imports: [ApplicationsModule, BusinessModule, DataModule],
})
export class ProjectsModule {}
