import { TestBed } from '@angular/core/testing';

import { SubstitutionManagerService } from './substitution-manager.service';

describe('SubstitutionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubstitutionManagerService = TestBed.get(SubstitutionManagerService);
    expect(service).toBeTruthy();
  });
});
