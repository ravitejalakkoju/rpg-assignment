import { Test, TestingModule } from '@nestjs/testing';
import { BlogEventsService } from './blog-events.service';

describe('BlogEventsService', () => {
  let service: BlogEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogEventsService],
    }).compile();

    service = module.get<BlogEventsService>(BlogEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
