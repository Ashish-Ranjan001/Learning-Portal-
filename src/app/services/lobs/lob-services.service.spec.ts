import { TestBed } from '@angular/core/testing';

import { LobServicesService } from './lob-services.service';

describe('LobServicesService', () => {
  let service: LobServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
