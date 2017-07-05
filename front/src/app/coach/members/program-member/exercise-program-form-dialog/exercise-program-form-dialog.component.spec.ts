import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseProgramFormDialogComponent } from './exercise-program-form-dialog.component';

describe('ExerciseProgramFormDialogComponent', () => {
  let component: ExerciseProgramFormDialogComponent;
  let fixture: ComponentFixture<ExerciseProgramFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseProgramFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseProgramFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
