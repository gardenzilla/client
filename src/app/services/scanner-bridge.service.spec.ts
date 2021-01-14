import { TestBed } from '@angular/core/testing';

import { ScannerBridgeService } from './scanner-bridge.service';

describe('ScannerBridgeService', () => {
  let service: ScannerBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScannerBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
