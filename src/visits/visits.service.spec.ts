import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { VisitsService } from './visits.service';

describe('VisitsService', () => {
  let service: VisitsService;

  const visitModelMock = {
    create: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitsService,
        {
          provide: getModelToken('Visit'),
          useValue: visitModelMock,
        },
      ],
    }).compile();

    service = module.get<VisitsService>(VisitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import { VisitsService } from './visits.service';