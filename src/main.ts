import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

/**
 * @function bootstrap
 * @description the bootstrap function to start the application
 * @returns {Promise<void>} the promise to start the application
 * @since 0.0.1
 */
async function bootstrap() {
  // loading the application
  const app = await NestFactory.create(AppModule);

  // loading config set
  const config = app.get(ConfigService);
  const env = config.get('app.env');

  // loading the swagger side of things
  if (env === 'local' || env === 'dev') {
    const swagger = new DocumentBuilder()
      .setTitle('TOFU Product Design Service - Platform Service is RUNNING')
      .setVersion('0.0.1')
      .setDescription(
        'Project Service for Product Development Service on TOFU Platform',
      )
      .setContact('Mark Leung', '', 'leungas@outlook.com')
      .addOAuth2(
        {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl:
                'https://tofuplatformdev.b2clogin.com/tofuplatformdev.onmicrosoft.com/b2c_1_tofu_dev/oauth2/v2.0/authorize',
              tokenUrl:
                'https://tofuplatformdev.b2clogin.com/tofuplatformdev.onmicrosoft.com/b2c_1_tofu_dev/oauth2/v2.0/token',
              scopes: {
                'https://tofuplatformdev.onmicrosoft.com/core/openid':
                  'OpenID Connect built-in scope: openid',
              },
            },
          },
        },
        'OAuth2Auth',
      )
      .addSecurityRequirements('OAuth2Auth', ['profile'])
      .build();
    const docs = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup(config.get('app.swagger.path'), app, docs, {
      swaggerOptions: {
        oauth2RedirectUrl:
          `${config.get('app.secure') ? 'https' : 'http'}://${
            config.get('app.host') ?? 'localhost'
          }${
            (config.get('app.env') ?? 'local') === 'local'
              ? ':' + config.get('app.port')
              : '/' + config.get('app.prefix')
          }` +
          '/' +
          config.get('app.swagger.path') +
          '/oauth2-redirect.html',
      },
    });
  }

  // security matters
  app.use(helmet());

  // enforcing CORS
  app.enableCors();

  // enforcing pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      forbidUnknownValues: true,
    }),
  );

  //start the HTTP server
  await app.listen(config.get('app.port'));
}

// starting the app
bootstrap();
