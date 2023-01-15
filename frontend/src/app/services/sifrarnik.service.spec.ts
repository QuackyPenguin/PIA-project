import { TestBed } from '@angular/core/testing';

import { SifrarnikService } from './sifrarnik.service';

describe('SifrarnikService', () => {
  let service: SifrarnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SifrarnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
