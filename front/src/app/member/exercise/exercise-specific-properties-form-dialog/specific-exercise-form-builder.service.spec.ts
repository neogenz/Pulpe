import { TestBed, inject } from '@angular/core/testing';

import { SpecificExerciseFormBuilderService } from './specific-exercise-form-builder.service';

describe('SpecificExerciseFormBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecificExerciseFormBuilderService]
    });
  });

  it('should be created', inject([SpecificExerciseFormBuilderService], (service: SpecificExerciseFormBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
