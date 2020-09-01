import { Test, TestingModule } from '@nestjs/testing';
import { ApiDownloadService } from './api-download.service';

describe('ApiDownloadService', () => {
  let service: ApiDownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiDownloadService],
    }).compile();

    service = module.get<ApiDownloadService>(ApiDownloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
