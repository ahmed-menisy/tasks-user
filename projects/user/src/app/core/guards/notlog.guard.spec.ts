import { TestBed } from '@angular/core/testing';

import { NotlogGuard } from './notlog.guard';

describe('NotlogGuard', () => {
  let guard: NotlogGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotlogGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
