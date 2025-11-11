import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFormulaMedicaComponent } from './crear-formula-medica';

describe('CrearFormulaMedicaComponent', () => {
  let component: CrearFormulaMedicaComponent;
  let fixture: ComponentFixture<CrearFormulaMedicaComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFormulaMedicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFormulaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
