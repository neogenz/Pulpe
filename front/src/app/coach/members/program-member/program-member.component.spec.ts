import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMemberComponent } from './program-member.component';

describe('ProgramMemberComponent', () => {
  let component: ProgramMemberComponent;
  let fixture: ComponentFixture<ProgramMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
