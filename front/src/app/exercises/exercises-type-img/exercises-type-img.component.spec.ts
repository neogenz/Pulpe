import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesTypeImgComponent } from './exercises-type-img.component';

describe('ExercisesTypeImgComponent', () => {
  let component: ExercisesTypeImgComponent;
  let fixture: ComponentFixture<ExercisesTypeImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesTypeImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesTypeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
