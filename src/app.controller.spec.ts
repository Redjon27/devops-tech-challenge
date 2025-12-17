import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { VisitsService } from './visits/visits.service';

describe('AppController', () => {
  let appController: AppController;
  let visitsService: { create: jest.Mock };

  beforeEach(async () => {
    visitsService = { create: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: VisitsService,
          useValue: visitsService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should return request and user_agent', async () => {
    const req: any = {
      method: 'GET',
      path: '/',
      query: {},
      ip: '127.0.0.1',
      socket: { remoteAddress: '127.0.0.1' },
      get: (h: string) => (h === 'user-agent' ? 'jest-agent' : undefined),
    };

    const res = await appController.visitorInfo(req);

    expect(visitsService.create).toHaveBeenCalledTimes(1);
    expect(res).toEqual({
      request: '[GET] /',
      user_agent: 'jest-agent',
    });
  });
});
