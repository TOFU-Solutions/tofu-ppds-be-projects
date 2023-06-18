import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';

/**
 * @module DomainsModule
 * @description the domains module holds the domains within the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  imports: [ProjectsModule],
  exports: [ProjectsModule],
})
export class DomainsModule {}
