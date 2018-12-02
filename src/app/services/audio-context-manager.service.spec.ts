import { TestBed } from '@angular/core/testing';

import { AudioContextManagerService } from './audio-context-manager.service';

describe('AudioContextManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioContextManagerService = TestBed.get(AudioContextManagerService);
    expect(service).toBeTruthy();
  });
});
