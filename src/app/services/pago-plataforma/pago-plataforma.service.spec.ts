import { TestBed } from '@angular/core/testing';

import { PagoPlataformaService } from './pago-plataforma.service';

describe('PagoPlataformaService', () => {
  let service: PagoPlataformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoPlataformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
