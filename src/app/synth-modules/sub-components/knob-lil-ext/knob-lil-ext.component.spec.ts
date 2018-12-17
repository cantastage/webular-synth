import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnobBigExtComponent } from './knob-big-ext.component';

describe('KnobBigExtComponent', () => {
  let component: KnobBigExtComponent;
  let fixture: ComponentFixture<KnobBigExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnobBigExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnobBigExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
