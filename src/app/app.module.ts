import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { DataModule } from '../data/data.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { controllers } from './controllers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/infrastructure/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';

/**
 * @module AppModule
 * @description the main application module to start the application DI
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
@Module({
  imports: [
    BusinessModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DataModule,
    EventEmitterModule.forRoot({
      maxListeners: 100,
    }),
    InfrastructureModule,
    JwtModule.register({}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri =
          'mongodb://' +
          config.get('datasource.mongo.user') +
          ':' +
          config.get('datasource.mongo.password') +
          '@' +
          config.get('datasource.mongo.host') +
          ':' +
          config.get('datasource.mongo.port') +
          '/?authMechanism=' +
          config.get('datasource.mongo.mechanism');
        return {
          name: 'default',
          uri: uri,
          dbName: config.get('datasource.mongo.database'),
        };
      },
    }),
  ],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}
