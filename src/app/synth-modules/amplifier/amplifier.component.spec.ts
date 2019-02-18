import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifierComponent } from './amplifier.component';

describe('AmplifierComponent', () => {
  let component: AmplifierComponent;
  let fixture: ComponentFixture<AmplifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmplifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmplifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
