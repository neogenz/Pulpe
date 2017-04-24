import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfficientLineGraphComponent } from './efficient-line-graph.component';

describe('EfficientLineGraphComponent', () => {
  let component: EfficientLineGraphComponent;
  let fixture: ComponentFixture<EfficientLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfficientLineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfficientLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
