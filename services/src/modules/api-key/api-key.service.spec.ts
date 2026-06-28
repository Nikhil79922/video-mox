import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyService } from './api-key.service';
import { beforeEach } from 'node:test';

describe('ApiKeyService', () => {
  let service: ApiKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyService],
    }).compile();

    service = module.get<ApiKeyService>(ApiKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
