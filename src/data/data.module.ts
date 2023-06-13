import { Module } from '@nestjs/common';
import { repositories } from './repsositories';

/**
 * @module DataModule
 * @description the data module holds the data access layer within the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  exports: [...repositories],
  imports: [],
  providers: [...repositories],
})
export class DataModule {}
