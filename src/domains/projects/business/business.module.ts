import { Module } from '@nestjs/common';
import { services } from './services';
import { DataModule } from 'src/domains/projects/data/data.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { commands } from './commands';

/**
 * @module BusinessModule
 * @description the business module holds the business logic within the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  exports: [...services],
  imports: [DataModule, InfrastructureModule],
  providers: [...services, ...commands],
})
export class BusinessModule {}
