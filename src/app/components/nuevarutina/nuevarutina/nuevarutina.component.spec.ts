import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevarutinaComponent } from './nuevarutina.component';

describe('NuevarutinaComponent', () => {
  let component: NuevarutinaComponent;
  let fixture: ComponentFixture<NuevarutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevarutinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevarutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
