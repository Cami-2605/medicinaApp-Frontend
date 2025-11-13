import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPacienteComponent } from './perfil-paciente';

describe('PerfilPaciente', () => {
  let component: PerfilPacienteComponent;
  let fixture: ComponentFixture<PerfilPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
