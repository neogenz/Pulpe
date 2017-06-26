import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMemberFormDialogComponent } from './profile-member-form-dialog.component';

describe('ProfileMemberFormDialogComponent', () => {
  let component: ProfileMemberFormDialogComponent;
  let fixture: ComponentFixture<ProfileMemberFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMemberFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMemberFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
