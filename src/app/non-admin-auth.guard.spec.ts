import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nonAdminAuthGuard } from './non-admin-auth.guard';

describe('nonAdminAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nonAdminAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
