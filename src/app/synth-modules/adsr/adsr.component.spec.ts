import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADSRComponent } from './adsr.component';

describe('ADSRComponent', () => {
  let component: ADSRComponent;
  let fixture: ComponentFixture<ADSRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADSRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADSRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
