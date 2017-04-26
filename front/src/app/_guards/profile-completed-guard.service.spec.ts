import { TestBed, inject } from '@angular/core/testing';

import { ProfilCompletedGuardService } from './profil-completed-guard.service';

describe('ProfileCompletedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilCompletedGuardService]
    });
  });

  it('should ...', inject([ProfilCompletedGuardService], (service: ProfilCompletedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
