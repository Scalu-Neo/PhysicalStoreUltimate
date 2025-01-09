import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from '../service/store.service';

describe('AppController', () => {
  let appController: StoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService],
    }).compile();

    appController = app.get<StoreController>(StoreController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllStore()).toBe('Hello World!');
    });
  });
});
