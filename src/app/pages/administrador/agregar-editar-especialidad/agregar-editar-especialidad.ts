import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-editar-especialidad',
  standalone: true,
  templateUrl: './agregar-editar-especialidad.html',
  styleUrls: ['./agregar-editar-especialidad.css'],
  imports: [CommonModule, FormsModule],
})
export class AgregarEditarEspecialidadComponent {
  // 🔹 Lista de médicos "quemados" (simulados)
  medicos = [
    { id: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología' },
    { id: 2, nombre: 'Dra. Ana Gómez', especialidad: 'Neurología' },
    { id: 3, nombre: 'Dr. Luis Torres', especialidad: 'Pediatría' },
  ];

  // 🔹 Objeto de especialidad
  especialidad = {
    id: 0,
    especialidad: '',
    medicosSeleccionados: [] as number[],
  };

  constructor(private router: Router) {}

  guardar() {
    // Obtener los médicos seleccionados completos
    const medicosAsignados = this.medicos.filter(m =>
      this.especialidad.medicosSeleccionados.includes(m.id)
    );

    console.log('Especialidad guardada:', {
      id: this.especialidad.id,
      especialidad: this.especialidad.especialidad,
      medicos: medicosAsignados
    });

    alert('Especialidad guardada correctamente');
    this.router.navigate(['/dashboard-administrador']);
  }

  cancelar() {
    this.router.navigate(['/dashboard-administrador']);
  }
}