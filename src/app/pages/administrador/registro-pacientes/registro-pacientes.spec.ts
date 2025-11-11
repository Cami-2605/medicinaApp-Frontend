import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPacientesComponent } from './registro-pacientes';

describe('RegistroPacientes', () => {
  let component: RegistroPacientesComponent;
  let fixture: ComponentFixture<RegistroPacientesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPacientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
