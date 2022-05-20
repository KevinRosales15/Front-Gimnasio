import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreardietaComponent } from './creardieta.component';

describe('CreardietaComponent', () => {
  let component: CreardietaComponent;
  let fixture: ComponentFixture<CreardietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreardietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreardietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
