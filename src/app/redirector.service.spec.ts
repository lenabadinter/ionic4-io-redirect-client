import { TestBed } from '@angular/core/testing';

import { RedirectorService } from './redirector.service';

describe('RedirectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedirectorService = TestBed.get(RedirectorService);
    expect(service).toBeTruthy();
  });
});
