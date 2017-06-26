import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkedMuscleComponent } from './select-worked-muscle.component';

describe('SelectWorkedMuscleComponent', () => {
  let component: SelectWorkedMuscleComponent;
  let fixture: ComponentFixture<SelectWorkedMuscleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWorkedMuscleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWorkedMuscleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
