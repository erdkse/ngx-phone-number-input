import { TestBed } from '@angular/core/testing';

import { PhoneInputService } from './phone-input.service';

describe('PhoneInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneInputService = TestBed.get(PhoneInputService);
    expect(service).toBeTruthy();
  });
});
