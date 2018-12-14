import { TestBed } from '@angular/core/testing';

import { MidiContextManagerService } from './midi-context-manager.service';

describe('MidiContextManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MidiContextManagerService = TestBed.get(MidiContextManagerService);
    expect(service).toBeTruthy();
  });
});
