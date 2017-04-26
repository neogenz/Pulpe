import { TestBed, inject } from '@angular/core/testing';

import { MeasurementEnumService } from './measurement-enum.service';

describe('MeasurementEnumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementEnumService]
    });
  });

  it('should ...', inject([MeasurementEnumService], (service: MeasurementEnumService) => {
    expect(service).toBeTruthy();
  }));
});
