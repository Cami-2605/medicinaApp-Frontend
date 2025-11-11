import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarEditarEspecialidadComponent } from './agregar-editar-especialidad';

describe('AgregarEditarEspecialidadComponent', () => {
  let component: AgregarEditarEspecialidadComponent;
  let fixture: ComponentFixture<AgregarEditarEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarEspecialidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEditarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});