import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfosCoachComponent } from './profile-infos-coach.component';

describe('ProfileInfosCoachComponent', () => {
  let component: ProfileInfosCoachComponent;
  let fixture: ComponentFixture<ProfileInfosCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInfosCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfosCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
