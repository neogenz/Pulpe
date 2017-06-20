import {TestBed, inject} from '@angular/core/testing';
import {ProfileIsCoachGuardService} from "./profile-is-coach-guard.service";


describe('ProfileIsCoachGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileIsCoachGuardService]
    });
  });

  it('should ...', inject([ProfileIsCoachGuardService], (service: ProfileIsCoachGuardService) => {
    expect(service).toBeTruthy();
  }));
});
