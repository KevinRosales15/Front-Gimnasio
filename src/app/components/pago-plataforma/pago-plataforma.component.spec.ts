import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPlataformaComponent } from './pago-plataforma.component';

describe('PagoPlataformaComponent', () => {
  let component: PagoPlataformaComponent;
  let fixture: ComponentFixture<PagoPlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoPlataformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
