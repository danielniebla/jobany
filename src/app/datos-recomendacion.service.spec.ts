import { TestBed } from '@angular/core/testing';

import { DatosRecomendacionService } from './datos-recomendacion.service';

describe('DatosRecomendacionService', () => {
  let service: DatosRecomendacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosRecomendacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
