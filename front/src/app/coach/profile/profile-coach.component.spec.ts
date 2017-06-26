import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCoachComponent } from './profile-coach.component';

describe('ProfileCoachComponent', () => {
  let component: ProfileCoachComponent;
  let fixture: ComponentFixture<ProfileCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
