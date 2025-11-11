import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-editar-medicamento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-editar-medicamento.html',
  styleUrls: ['./agregar-editar-medicamento.css'],
})
export class AgregarEditarMedicamentoComponent {
  medicamento = {
    nombre: '',
    descripcion: '',
    presentacion: '',
    dosis: '',
    estado: 'activo',
  };

  constructor(private router: Router) {}

  guardar() {
    console.log('Medicamento guardado:', this.medicamento);
    alert('✅ Medicamento guardado correctamente');
    this.router.navigate(['/dashboard-administrador']); // redirige al dashboard del admin
  }

  cancelar() {
    this.router.navigate(['/dashboard-administrador']);
  }
}