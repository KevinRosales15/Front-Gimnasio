import { TestBed } from '@angular/core/testing';

import { TablaempleadoService } from './tablaempleado.service';

describe('TablaempleadoService', () => {
  let service: TablaempleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaempleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
