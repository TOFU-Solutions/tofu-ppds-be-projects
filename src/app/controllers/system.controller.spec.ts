import { Test, TestingModule } from '@nestjs/testing';
import { SystemController } from './system.controller';
import { SystemService } from '../../domains/projects/business/services/system.service';

describe('AppController', () => {
  let appController: SystemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SystemController],
      providers: [SystemService],
    }).compile();

    appController = app.get<SystemController>(SystemController);
  });

  describe('root', () => {
    it('should return "TOFU PPDS Project Service is RUNNING!"', () => {
      expect(appController.healthcheck()).toBe(
        'Hello TOFU PPDS Project Service is RUNNING!',
      );
    });
  });
});
