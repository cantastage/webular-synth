import { TestBed } from '@angular/core/testing';

import { ModuleManagerService } from './module-manager.service';

describe('ModuleManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleManagerService = TestBed.get(ModuleManagerService);
    expect(service).toBeTruthy();
  });
});
