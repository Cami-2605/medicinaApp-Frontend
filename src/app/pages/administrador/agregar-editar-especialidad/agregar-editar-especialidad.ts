import { AgregarEspecialidadDt } from './../../../core/models/dto/especialidad/agregar-especialidad.dto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspecialidadService } from '../../../core/services/admin/especialidad.service';
import { ToastService } from '../../../components/toast/service/toast.service';

@Component({
  selector: 'app-agregar-editar-especialidad',
  standalone: true,
  templateUrl: './agregar-editar-especialidad.html',
  styleUrls: ['./agregar-editar-especialidad.css'],
  imports: [CommonModule, FormsModule],
})
export class AgregarEditarEspecialidadComponent {
  especialidad = {
    id: 0,
    especialidad: '',
    medicosSeleccionados: [] as number[],
  };

  constructor(
    private router: Router,
    private especialidadService: EspecialidadService,
    private toastService: ToastService
  ) {}

  guardar() {
    // Validación básica
    if (!this.especialidad.especialidad.trim()) {
      this.toastService.show('El nombre de la especialidad es obligatorio', 'error');
      return;
    }

    // Crear DTO para enviar al backend
    const dto: AgregarEspecialidadDt = {
      especialidad: this.especialidad.especialidad.trim(),
    };

    this.especialidadService.registrarEspecialidad(dto).subscribe({
      next: (mensaje) => {
        this.toastService.show(mensaje, 'success');
        // Redirigir al dashboard después de unos segundos
        setTimeout(() => this.router.navigate(['/admin/dashboard']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Error registrando especialidad', 'error');
      },
    });
  }

  cancelar() {
    this.router.navigate(['/admin/dashboard']);
  }
}
