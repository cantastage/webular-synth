import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgSeqOscillatorComponent } from './prog-seq-oscillator.component';

describe('ProgSeqOscillatorComponent', () => {
  let component: ProgSeqOscillatorComponent;
  let fixture: ComponentFixture<ProgSeqOscillatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgSeqOscillatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgSeqOscillatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
