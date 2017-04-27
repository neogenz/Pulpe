import {TestBed, inject} from '@angular/core/testing';

import {ProfileCompletedGuardService} from './profile-completed-guard.service';

describe('ProfileCompletedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileCompletedGuardService]
    });
  });

  it('should ...', inject([ProfileCompletedGuardService], (service: ProfileCompletedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
