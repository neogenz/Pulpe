import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoachComponent } from './home-coach.component';

describe('HomeCoachComponent', () => {
  let component: HomeCoachComponent;
  let fixture: ComponentFixture<HomeCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
