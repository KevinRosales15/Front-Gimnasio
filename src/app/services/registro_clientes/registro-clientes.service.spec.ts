import { TestBed } from '@angular/core/testing';

import { RegistroClientesService } from './registro-clientes.service';

describe('RegistroClientesService', () => {
  let service: RegistroClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
