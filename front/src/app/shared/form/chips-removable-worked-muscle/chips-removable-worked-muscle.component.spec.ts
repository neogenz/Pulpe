import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsRemovableWorkedMuscleComponent } from './chips-removable-worked-muscle.component';

describe('ChipsRemovableWorkedMuscleComponent', () => {
  let component: ChipsRemovableWorkedMuscleComponent;
  let fixture: ComponentFixture<ChipsRemovableWorkedMuscleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsRemovableWorkedMuscleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsRemovableWorkedMuscleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
