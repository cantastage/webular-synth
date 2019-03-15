import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordDisplayComponent } from './chord-display.component';

describe('ChordDisplayComponent', () => {
  let component: ChordDisplayComponent;
  let fixture: ComponentFixture<ChordDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
