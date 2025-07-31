import { TestBed } from '@angular/core/testing';

import { TaServiceService } from './ta-service.service';

describe('TaServiceService', () => {
  let service: TaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
