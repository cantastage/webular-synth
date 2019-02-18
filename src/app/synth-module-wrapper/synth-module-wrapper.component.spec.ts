import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthModuleWrapperComponent } from './synth-module-wrapper.component';

describe('SynthModuleWrapperComponent', () => {
  let component: SynthModuleWrapperComponent;
  let fixture: ComponentFixture<SynthModuleWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynthModuleWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthModuleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
