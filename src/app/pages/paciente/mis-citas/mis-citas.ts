import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.css'],
})
export class MisCitasComponent {
  constructor(private router: Router) {}

  nombrePaciente = 'Juan Pérez';
  vistaCitas: 'proximas' | 'pasadas' = 'proximas';

  citasProximas = [
    { id: 'C001', fecha: '15 de Noviembre, 2025', hora: '9:00 AM', medico: 'Dr. Andrés Morales', especialidad: 'Neurología', estado: 'Confirmada' },
    { id: 'C002', fecha: '25 de Noviembre, 2025', hora: '11:00 AM', medico: 'Dra. Sofía Jiménez', especialidad: 'Oftalmología', estado: 'Confirmada' }
  ];

  citasPasadas = [
    { id: 'C101', fecha: '10 de Octubre, 2025', hora: '8:00 AM', medico: 'Dr. Juan Gómez', especialidad: 'Dermatología', estado: 'Finalizada' },
    { id: 'C102', fecha: '2 de Septiembre, 2025', hora: '3:30 PM', medico: 'Dra. María Torres', especialidad: 'Cardiología', estado: 'Finalizada' }
  ];

  cambiarVista(vista: 'proximas' | 'pasadas') {
    this.vistaCitas = vista;
  }

  cancelarCita(cita: any) {
    const confirmar = confirm(`¿Deseas cancelar la cita con ${cita.medico}?`);
    if (confirmar) {
      alert(`Cita con ${cita.medico} cancelada.`);
      this.citasProximas = this.citasProximas.filter(c => c !== cita);
    }
  }

  volverDashboard() {
    this.router.navigate(['/dashboard-paciente']);
  }
}