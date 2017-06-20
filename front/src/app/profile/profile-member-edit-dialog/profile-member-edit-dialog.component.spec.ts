import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMemberEditDialogComponent } from './profile-member-edit-dialog.component';

describe('ProfileMemberEditDialogComponent', () => {
  let component: ProfileMemberEditDialogComponent;
  let fixture: ComponentFixture<ProfileMemberEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMemberEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMemberEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
