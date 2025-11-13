import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-formulas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-formulas.html',
  styleUrls: ['./mis-formulas.css']
})
export class MisFormulasComponent {
  constructor(private router: Router) {}

  nombrePaciente = 'Juan Pérez';

  formulas = [
    { fecha: '20 de Mayo, 2024', medico: 'Dr. Carlos Vargas', especialidad: 'Cardiología', medicamento: 'Losartán', dosis: '50mg', duracion: '30 días' },
    { fecha: '22 de Junio, 2024', medico: 'Dra. Ana Lucía Pérez', especialidad: 'Dermatología', medicamento: 'Hidrocortisona', dosis: '1%', duracion: '15 días' },
    { fecha: '10 de Agosto, 2024', medico: 'Dr. Miguel Torres', especialidad: 'Neurología', medicamento: 'Gabapentina', dosis: '300mg', duracion: '20 días' },
  ];

  verDetalles(formula: any) {
    alert(`📄 Detalles de la fórmula:
Médico: ${formula.medico}
Especialidad: ${formula.especialidad}
Medicamento: ${formula.medicamento}
Dosis: ${formula.dosis}
Duración: ${formula.duracion}`);
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard-paciente']);
  }
}