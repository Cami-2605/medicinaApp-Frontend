import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminPacienteService } from '../../../core/services/admin/admin-paciente.service';
import { ToastService } from '../../../components/toast/service/toast.service';
import { RegistrarPacienteDto } from '../../../core/models/dto/paciente/registrar-paciente.dto';
import { CrearUserDto } from '../../../core/models/dto/common/user/crear-user.dto';
import { RegistroTelefonoDto } from '../../../core/models/dto/common/telefono/registro-telefono.dto';

@Component({
  selector: 'app-registro-pacientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-pacientes.html',
  styleUrls: ['./registro-pacientes.css'],
})
export class RegistroPacientesComponent {
  paciente = {
    nombres: '',
    apellidos: '',
    documento: '',
    fechaNacimiento: '',
    email: '',
    usuario: '',
    telefono: '',
    direccion: '',
    contrasena: '',
  };

  constructor(
    private router: Router,
    private pacienteService: AdminPacienteService,
    private toastService: ToastService
  ) {}

  registrarPaciente() {
    // Validaciones básicas
    if (
      !this.paciente.nombres ||
      !this.paciente.apellidos ||
      !this.paciente.email ||
      !this.paciente.contrasena
    ) {
      this.toastService.show('Por favor completa todos los campos obligatorios', 'error');
      return;
    }

    const dto: RegistrarPacienteDto = {
      nombre: `${this.paciente.nombres} ${this.paciente.apellidos}`,
      crearUserDto: {
        email: this.paciente.email,
        password: this.paciente.contrasena,
      } as CrearUserDto,
      idEps: 1, // por ahora fijo, puedes cambiarlo con un select de EPS
      idCiudad: 1, // por ahora fijo, puedes cambiarlo con un select de ciudad
      telefonos: [{ numero: this.paciente.telefono } as RegistroTelefonoDto],
    };

    this.pacienteService.registrarPaciente(dto).subscribe({
      next: (mensaje) => {
        this.toastService.show(mensaje, 'success');
        this.limpiarFormulario();
        this.router.navigate(['admin/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Error registrando paciente', 'error');
      },
    });
  }

  limpiarFormulario() {
    this.paciente = {
      nombres: '',
      apellidos: '',
      documento: '',
      fechaNacimiento: '',
      email: '',
      usuario: '',
      telefono: '',
      direccion: '',
      contrasena: '',
    };
  }
}
