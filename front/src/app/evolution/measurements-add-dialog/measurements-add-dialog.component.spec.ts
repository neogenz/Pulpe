import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsAddDialogComponent } from './measurements-add-dialog.component';

describe('MeasurementsAddDialogComponent', () => {
  let component: MeasurementsAddDialogComponent;
  let fixture: ComponentFixture<MeasurementsAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
