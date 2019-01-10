import { TestBed } from '@angular/core/testing';

import { ClockManagerService } from './clock-manager.service';

describe('ClockManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClockManagerService = TestBed.get(ClockManagerService);
    expect(service).toBeTruthy();
  });
});
