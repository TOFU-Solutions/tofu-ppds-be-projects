import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { controllers } from './controllers';
import { CqrsModule } from '@nestjs/cqrs';

/**
 * @module ApplicationsModule
 * @description the applications module holds the applications domain within the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  controllers: [...controllers],
  imports: [BusinessModule, CqrsModule],
})
export class ApplicationsModule {}
