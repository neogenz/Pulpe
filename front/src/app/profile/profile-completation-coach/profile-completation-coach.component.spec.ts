import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletationCoachComponent } from './profile-completation-coach.component';

describe('ProfileCompletationCoachComponent', () => {
  let component: ProfileCompletationCoachComponent;
  let fixture: ComponentFixture<ProfileCompletationCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompletationCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompletationCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
