import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCounterWithIconComponent } from './simple-counter-with-icon.component';

describe('SimpleCounterWithIconComponent', () => {
  let component: SimpleCounterWithIconComponent;
  let fixture: ComponentFixture<SimpleCounterWithIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleCounterWithIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCounterWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
