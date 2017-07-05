import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderListSessionsComponent } from './header-list-sessions.component';

describe('HeaderListSessionsComponent', () => {
  let component: HeaderListSessionsComponent;
  let fixture: ComponentFixture<HeaderListSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderListSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderListSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
