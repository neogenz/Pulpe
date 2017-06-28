import { TestBed, inject } from '@angular/core/testing';

import { SpecificExercisePropertiesFormBuilderService } from './specific-exercise-properties-form-builder.service';

describe('SpecificExercisePropertiesFormBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecificExercisePropertiesFormBuilderService]
    });
  });

  it('should be created', inject([SpecificExercisePropertiesFormBuilderService], (service: SpecificExercisePropertiesFormBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
