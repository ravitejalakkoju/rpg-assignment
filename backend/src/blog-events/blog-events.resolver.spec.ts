import { Test, TestingModule } from '@nestjs/testing';
import { BlogEventsResolver } from './blog-events.resolver';
import { BlogEventsService } from './blog-events.service';

describe('BlogEventsResolver', () => {
  let resolver: BlogEventsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogEventsResolver, BlogEventsService],
    }).compile();

    resolver = module.get<BlogEventsResolver>(BlogEventsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
