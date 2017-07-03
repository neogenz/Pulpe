import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFormDialogComponent } from './photo-form-dialog.component';

describe('PhotoFormDialogComponent', () => {
  let component: PhotoFormDialogComponent;
  let fixture: ComponentFixture<PhotoFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
