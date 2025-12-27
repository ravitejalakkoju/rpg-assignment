import { Test, TestingModule } from '@nestjs/testing';
import { NotificationLogsResolver } from './notification-logs.resolver';
import { NotificationLogsService } from './notification-logs.service';

describe('NotificationLogsResolver', () => {
  let resolver: NotificationLogsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationLogsResolver, NotificationLogsService],
    }).compile();

    resolver = module.get<NotificationLogsResolver>(NotificationLogsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
