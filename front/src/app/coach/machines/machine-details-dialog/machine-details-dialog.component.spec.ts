import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailsDialogComponent } from './machine-details-dialog.component';

describe('MachineDetailsDialogComponent', () => {
  let component: MachineDetailsDialogComponent;
  let fixture: ComponentFixture<MachineDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
