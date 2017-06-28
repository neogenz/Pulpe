import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSpecificPropertiesFormDialogComponent } from './exercise-specific-properties-form-dialog.component';

describe('ExerciseSpecificPropertiesFormDialogComponent', () => {
  let component: ExerciseSpecificPropertiesFormDialogComponent;
  let fixture: ComponentFixture<ExerciseSpecificPropertiesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseSpecificPropertiesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSpecificPropertiesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
