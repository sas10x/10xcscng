import { TestBed } from '@angular/core/testing';

import { EffectsCartService } from './effects-cart.service';

describe('EffectsCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EffectsCartService = TestBed.get(EffectsCartService);
    expect(service).toBeTruthy();
  });
});
