import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MedicamentoDto } from '../../../core/models/dto/medicamento/medicamento.dto';
import { MedicamentoService } from '../../../core/services/admin/medicamento.service';
import { ToastService } from '../../../components/toast/service/toast.service';
import { RegistrarMedicamentoDto } from '../../../core/models/dto/medicamento/registrar-medicamento.dto';

@Component({
  selector: 'app-agregar-editar-medicamento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-editar-medicamento.html',
  styleUrls: ['./agregar-editar-medicamento.css'],
})
export class AgregarEditarMedicamentoComponent implements OnInit {
  medicamento = {
    nombre: '',
    descripcion: '',
    presentacion: '',
    dosis: '',
    estado: 'activo',
  };

  medicamentosRegistrados: MedicamentoDto[] = [];

  constructor(
    private router: Router,
    private medicamentoService: MedicamentoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  guardar() {
    // Validación básica
    if (!this.medicamento.nombre.trim()) {
      this.toastService.show('El nombre del medicamento es obligatorio', 'error');
      return;
    }

    const dto: RegistrarMedicamentoDto = {
      nombre: this.medicamento.nombre.trim(),
      precio: 0, // si quieres, puedes agregar campo de precio en el formulario
    };

    this.medicamentoService.registrarMedicamento(dto).subscribe({
      next: (mensaje) => {
        this.toastService.show(mensaje, 'success');
        this.limpiarFormulario();
        this.cargarMedicamentos();
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Error registrando medicamento', 'error');
      },
    });
  }

  cancelar() {
    this.router.navigate(['admin/dashboard']);
  }

  // 🔹 Cargar lista de medicamentos registrados
  cargarMedicamentos() {
    this.medicamentoService.listarMedicamentos().subscribe({
      next: (meds) => (this.medicamentosRegistrados = meds),
      error: (err) => {
        console.error(err);
        this.toastService.show('Error cargando lista de medicamentos', 'error');
      },
    });
  }

  limpiarFormulario() {
    this.medicamento = {
      nombre: '',
      descripcion: '',
      presentacion: '',
      dosis: '',
      estado: 'activo',
    };
  }
}
