import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineFormDialogComponent } from './machine-form-dialog.component';

describe('MachineFormDialogComponent', () => {
  let component: MachineFormDialogComponent;
  let fixture: ComponentFixture<MachineFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
