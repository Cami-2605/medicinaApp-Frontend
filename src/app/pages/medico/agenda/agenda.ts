import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 para *ngFor y *ngIf
import { FormsModule } from '@angular/forms';   // 👈 para [(ngModel)]
import { RouterModule } from '@angular/router'; // 👈 para routerLink

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agenda.html',
  styleUrls: ['./agenda.css'],
})
export class AgendaComponent {
  // 🔹 Lista de citas
  citas = [
    { paciente: 'Juan Pérez', fecha: '2025-11-12', hora: '09:00 AM' },
    { paciente: 'Ana Gómez', fecha: '2025-11-13', hora: '10:30 AM' },
    { paciente: 'Luis Rodríguez', fecha: '2025-11-14', hora: '03:00 PM' },
  ];

  citaSeleccionada: any = null;

  // 🔹 Método para mostrar detalles de una cita
  verDetalles(cita: any) {
    this.citaSeleccionada = cita;
  }

  // 🔹 Método para limpiar la selección
  cerrarDetalles() {
    this.citaSeleccionada = null;
  }
}