import { TestBed } from '@angular/core/testing';

import { SmeServicesService } from './sme-services.service';

describe('SmeServicesService', () => {
  let service: SmeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
