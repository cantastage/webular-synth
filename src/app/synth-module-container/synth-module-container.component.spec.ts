import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthModuleContainerComponent } from './synth-module-container.component';

describe('SynthModuleContainerComponent', () => {
  let component: SynthModuleContainerComponent;
  let fixture: ComponentFixture<SynthModuleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynthModuleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthModuleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
