import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesListComponent } from './exercises-list.component';

describe('ExercisesListComponent', () => {
  let component: ExercisesListComponent;
  let fixture: ComponentFixture<ExercisesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
