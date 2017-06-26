import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCoachEditDialogComponent } from './profile-coach-edit-dialog.component';

describe('ProfileCoachEditDialogComponent', () => {
  let component: ProfileCoachEditDialogComponent;
  let fixture: ComponentFixture<ProfileCoachEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCoachEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCoachEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
