import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesRepartitionGraphComponent } from './exercises-repartition-graph.component';

describe('ExercisesRepartitionGraphComponent', () => {
  let component: ExercisesRepartitionGraphComponent;
  let fixture: ComponentFixture<ExercisesRepartitionGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesRepartitionGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesRepartitionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
