import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementGraphComponent } from './measurement-graph.component';

describe('MeasurementGraphComponent', () => {
  let component: MeasurementGraphComponent;
  let fixture: ComponentFixture<MeasurementGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
