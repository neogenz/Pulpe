import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionObjectiveComponent } from './session-objective.component.ts';

describe('SessionObjectiveComponent', () => {
  let component: SessionObjectiveComponent;
  let fixture: ComponentFixture<SessionObjectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionObjectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
