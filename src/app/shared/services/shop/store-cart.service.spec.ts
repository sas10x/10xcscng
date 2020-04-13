import { TestBed } from '@angular/core/testing';

import { StoreCartService } from './store-cart.service';

describe('StoreCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreCartService = TestBed.get(StoreCartService);
    expect(service).toBeTruthy();
  });
});
