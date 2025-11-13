import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pacientes.html',
  styleUrls: ['./pacientes.css'], // 👈 reutiliza el mismo estilo
})
export class PacientesComponent {
  // 🔹 Lista de pacientes registrados
  pacientes = [
    { nombre: 'Juan', apellido: 'Pérez', documento: '123456789', correo: 'juan.perez@example.com' },
    { nombre: 'Ana', apellido: 'Gómez', documento: '987654321', correo: 'ana.gomez@example.com' },
    { nombre: 'Luis', apellido: 'Rodríguez', documento: '456789123', correo: 'luis.rodriguez@example.com' },
  ];

  pacienteSeleccionado: any = null;

  verDetalles(paciente: any) {
    this.pacienteSeleccionado = paciente;
  }

  cerrarDetalles() {
    this.pacienteSeleccionado = null;
  }
}