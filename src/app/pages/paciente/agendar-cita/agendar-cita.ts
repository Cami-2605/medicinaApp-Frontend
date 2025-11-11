import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar-cita.html',
  styleUrls: ['./agendar-cita.css'],
})
export class AgendarCitaComponent {
  fecha: string = '';
  hora: string = '';
  especialidad: string = '';
  medico: string = '';

  confirmarCita() {
    if (!this.fecha || !this.hora || !this.especialidad || !this.medico) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    alert(
      `✅ Cita confirmada:\n\n📅 Fecha: ${this.fecha}\n⏰ Hora: ${this.hora}\n🏥 Especialidad: ${this.especialidad}\n👨‍⚕️ Médico: ${this.medico}`
    );
  }
}