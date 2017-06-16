import {TestBed, inject} from '@angular/core/testing';

import {ProfileIsMemberGuardService} from './profile-is-member-guard.service';

describe('ProfileIsMemberGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileIsMemberGuardService]
    });
  });

  it('should ...', inject([ProfileIsMemberGuardService], (service: ProfileIsMemberGuardService) => {
    expect(service).toBeTruthy();
  }));
});
