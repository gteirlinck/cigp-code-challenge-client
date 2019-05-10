import { TestBed } from '@angular/core/testing';

import { ServerAPIService } from './server-api.service';

describe('ServerAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerAPIService = TestBed.get(ServerAPIService);
    expect(service).toBeTruthy();
  });
});
