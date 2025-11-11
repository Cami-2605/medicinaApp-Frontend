import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-editar-especialidad',
  standalone: true,
  templateUrl: './agregar-editar-especialidad.html',
  styleUrls: ['./agregar-editar-especialidad.css'],
  imports: [FormsModule],
})
export class AgregarEditarEspecialidadComponent {
  especialidad = {
    nombre: '',
    descripcion: '',
    area: '',
    estado: 'activo'
  };

  constructor(private router: Router) {}

  guardar() {
    console.log('Especialidad guardada:', this.especialidad);
    alert('Especialidad guardada correctamente');
    this.router.navigate(['/dashboard-administrador']);
  }

  cancelar() {
    this.router.navigate(['/dashboard-administrador']);
  }
}