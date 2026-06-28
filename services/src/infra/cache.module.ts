import { LRUCache } from 'lru-cache';
import { Global, Module } from '@nestjs/common';
import { ApiKey } from '@prisma/client';

export const LRU_CACHE = 'LRU_CACHE';

@Global()
@Module({
  providers: [
    {
      provide: LRU_CACHE,
      useFactory: () => {
        return new LRUCache<string, ApiKey>({
          max: 1000,
          ttl: 5 * 60 * 1000,
          updateAgeOnGet: true,
          updateAgeOnHas: false,
          allowStale: false,
        });
      },
    },
  ],
  exports: [LRU_CACHE],
})
export class CacheModule {}
