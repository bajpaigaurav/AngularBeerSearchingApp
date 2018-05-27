import { TestBed, inject } from '@angular/core/testing';

import { GetBeerDetailsService } from './get-beer-details.service';

describe('GetBeerDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBeerDetailsService]
    });
  });

  it('should be created', inject([GetBeerDetailsService], (service: GetBeerDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
