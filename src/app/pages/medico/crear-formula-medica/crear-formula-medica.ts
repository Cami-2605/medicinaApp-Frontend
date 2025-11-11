import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 necesario para *ngFor y *ngIf
import { FormsModule } from '@angular/forms';   // 👈 necesario para [(ngModel)]
import { RouterModule } from '@angular/router'; // 👈 necesario para routerLink

@Component({
  selector: 'app-crear-formula-medica',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // 👈 agregamos CommonModule aquí
  templateUrl: './crear-formula-medica.html',
  styleUrls: ['./crear-formula-medica.css'],
})
export class CrearFormulaMedicaComponent {
  pacientes = ['Juan Pérez', 'Ana Gómez', 'Luis Rodríguez'];
  pacienteSeleccionado: string = '';
  notas: string = '';

  medicamentos = [
    {
      nombre: 'Paracetamol 500mg',
      cantidad: '20 comprimidos',
      indicaciones: 'Tomar 1 comprimido cada 6 horas por 5 días.',
    },
    {
      nombre: 'Ibuprofeno 400mg',
      cantidad: '10 comprimidos',
      indicaciones: 'Tomar 1 comprimido si hay dolor intenso.',
    },
  ];

  agregarMedicamento() {
    const nuevo = {
      nombre: 'Nuevo medicamento',
      cantidad: 'Cantidad',
      indicaciones: 'Indicaciones...',
    };
    this.medicamentos.push(nuevo);
  }

  eliminarMedicamento(index: number) {
    this.medicamentos.splice(index, 1);
  }

  cancelar() {
    if (confirm('¿Desea cancelar la creación de la fórmula médica?')) {
      this.pacienteSeleccionado = '';
      this.notas = '';
      this.medicamentos = [];
    }
  }

  guardarFormula() {
    alert('✅ Fórmula médica guardada correctamente');
  }
}