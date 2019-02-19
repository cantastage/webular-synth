import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordSubstitutionComponent } from './chord-substitution.component';

describe('ChordSubstitutionComponent', () => {
  let component: ChordSubstitutionComponent;
  let fixture: ComponentFixture<ChordSubstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordSubstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordSubstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
