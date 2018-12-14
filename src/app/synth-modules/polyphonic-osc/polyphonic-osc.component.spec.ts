import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyphonicOscComponent } from './polyphonic-osc.component';

describe('PolyphonicOscComponent', () => {
  let component: PolyphonicOscComponent;
  let fixture: ComponentFixture<PolyphonicOscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyphonicOscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolyphonicOscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
