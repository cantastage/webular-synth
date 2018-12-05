import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoogLadderFilterComponent } from './moog-ladder-filter.component';

describe('MoogLadderFilterComponent', () => {
  let component: MoogLadderFilterComponent;
  let fixture: ComponentFixture<MoogLadderFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoogLadderFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoogLadderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
