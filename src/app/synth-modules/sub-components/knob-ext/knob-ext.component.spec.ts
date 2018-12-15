import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnobExtComponent } from './knob-ext.component';

describe('KnobExtComponent', () => {
  let component: KnobExtComponent;
  let fixture: ComponentFixture<KnobExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnobExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnobExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
