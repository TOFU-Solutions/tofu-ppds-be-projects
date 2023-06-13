import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { DataModule } from '../data/data.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { controllers } from './controllers';

/**
 * @module AppModule
 * @description the main application module to start the application DI
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  imports: [BusinessModule, DataModule, InfrastructureModule],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}
