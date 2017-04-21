import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationMockService } from './authentication-mock.service';

describe('AuthenticationMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationMockService]
    });
  });

  it('should ...', inject([AuthenticationMockService], (service: AuthenticationMockService) => {
    expect(service).toBeTruthy();
  }));
});
