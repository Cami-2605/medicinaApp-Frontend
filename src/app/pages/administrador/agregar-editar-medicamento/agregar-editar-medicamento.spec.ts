import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarMedicamentoComponent } from './agregar-editar-medicamento';

describe('AgregarEditarMedicamento', () => {
  let component: AgregarEditarMedicamentoComponent;
  let fixture: ComponentFixture<AgregarEditarMedicamentoComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarMedicamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
