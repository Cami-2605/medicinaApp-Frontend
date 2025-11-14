import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminMedicoService } from '../../../core/services/admin/admin-medico.service';
import { EspecialidadService } from '../../../core/services/admin/especialidad.service';
import { EspecialidadDto } from '../../../core/models/dto/especialidad/especialidad.dto';
import { RegistrarMedicoDto } from '../../../core/models/dto/medico/registrar-medico.dto';
import { CrearUserDto } from '../../../core/models/dto/common/user/crear-user.dto';
import { RegistroTelefonoDto } from '../../../core/models/dto/common/telefono/registro-telefono.dto';
import { Toast } from '../../../components/toast/toast';

@Component({
  selector: 'app-registro-medicos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-medicos.html',
  styleUrls: ['./registro-medicos.css'],
})
export class RegistroMedicosComponent implements OnInit {
  especialidades: EspecialidadDto[] = [];

  nuevoMedico: RegistrarMedicoDto = {
    nombre: '',
    user: { email: '', password: '' },
    telefonos: [{ numero: '' }],
    idEspecialidad: 0,
  };

  constructor(
    private router: Router,
    private medicoService: AdminMedicoService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  // 🔹 Cargar especialidades desde el backend
  cargarEspecialidades() {
    this.especialidadService.listarEspecialidades().subscribe({
      next: (lista) => {
        this.especialidades = lista;
      },
    });
  }

  // 🔹 Registrar médico usando DTO
  registrarMedico() {
    if (!this.nuevoMedico.idEspecialidad || !this.nuevoMedico.nombre) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    this.medicoService.registrarMedico(this.nuevoMedico).subscribe({
      next: (mensaje) => {
        alert(`${mensaje}`);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Error registrando médico.');
      },
    });
  }
}
