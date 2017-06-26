import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormDialogComponent } from './exercise-form-dialog.component';

describe('ExerciseFormDialogComponent', () => {
  let component: ExerciseFormDialogComponent;
  let fixture: ComponentFixture<ExerciseFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
