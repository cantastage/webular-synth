import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgSequencerComponent } from './prog-sequencer.component';

describe('ProgSequencerComponent', () => {
  let component: ProgSequencerComponent;
  let fixture: ComponentFixture<ProgSequencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgSequencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgSequencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
