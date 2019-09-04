import { TestBed } from '@angular/core/testing';

import { ChordDisplayService } from './chord-display.service';

describe('ChordDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChordDisplayService = TestBed.get(ChordDisplayService);
    expect(service).toBeTruthy();
  });
});
