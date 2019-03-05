import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgSeqAmpComponent } from './prog-seq-amp.component';

describe('ProgSeqAmpComponent', () => {
  let component: ProgSeqAmpComponent;
  let fixture: ComponentFixture<ProgSeqAmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgSeqAmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgSeqAmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
