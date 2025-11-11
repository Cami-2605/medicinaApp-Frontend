import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-paciente.html',
  styleUrls: ['./dashboard-paciente.css'],
})
export class DashboardPacienteComponent {
  constructor(private router: Router) {}

  nombrePaciente = 'Juan Pérez';
  vistaCitas: 'proximas' | 'pasadas' = 'proximas';

  citas = [
    { fecha: '20 de Julio, 2024', hora: '10:00 AM', medico: 'Dr. Carlos Vargas', especialidad: 'Cardiología', estado: 'Confirmada' },
    { fecha: '15 de Agosto, 2024', hora: '02:30 PM', medico: 'Dra. Ana Lucía Pérez', especialidad: 'Dermatología', estado: 'Confirmada' }
  ];

  formulas = [
    { fecha: '20 de Mayo, 2024', medico: 'Dr. Carlos Vargas', medicamento: 'Losartán', dosis: '50mg', duracion: '30 días' },
    { fecha: '22 de Junio, 2024', medico: 'Dra. Ana Lucía Pérez', medicamento: 'Hidrocortisona', dosis: '1%', duracion: '15 días' }
  ];

  perfil = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '+1 (555) 123-4567',
    fechaNacimiento: '1985-12-04',
    genero: 'Masculino'
  };

  // 🔹 Ir a Agendar Cita
  agendarCita() {
    this.router.navigate(['/agendar-cita']);
  }

  cancelarCita(cita: any) {
    const confirmar = confirm(`¿Deseas cancelar la cita con ${cita.medico}?`);
    if (confirmar) {
      alert(`Cita con ${cita.medico} cancelada.`);
      this.citas = this.citas.filter(c => c !== cita);
    }
  }

  verDetalles(formula: any) {
    alert(`Detalles de la fórmula:\n${formula.medicamento} - ${formula.dosis}\nDuración: ${formula.duracion}`);
  }

  actualizarPerfil() {
    alert(`Perfil actualizado correctamente.\nNombre: ${this.perfil.nombre}`);
  }

  cambiarVista(vista: 'proximas' | 'pasadas') {
    this.vistaCitas = vista;
  }
}