import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/**
 * @function bootstrap
 * @description the main entry point to start the application
 * @version 0.0.1
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
