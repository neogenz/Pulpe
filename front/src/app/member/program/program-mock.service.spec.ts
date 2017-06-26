import { TestBed, inject } from '@angular/core/testing';

import { ProgramMockService } from './program-mock.service.ts';

describe('ProgramMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramMockService]
    });
  });

  it('should ...', inject([ProgramMockService], (service: ProgramMockService) => {
    expect(service).toBeTruthy();
  }));
});
