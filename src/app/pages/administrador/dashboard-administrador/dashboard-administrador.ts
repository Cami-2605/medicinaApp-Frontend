import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminPacienteService } from '../../../core/services/admin/admin-paciente.service';
import { PacienteDto } from '../../../core/models/dto/paciente/paciente.dto';
import { TokenService } from '../../../core/interceptors/token.service';
import { LogoutService } from '../../../core/interceptors/logout.service';

@Component({
  selector: 'app-dashboard-administrador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-administrador.html',
  styleUrls: ['./dashboard-administrador.css'],
})
export class DashboardAdministradorComponent implements OnInit {
  pacientesActivos: number = 0;
  citasActivasHoy: number = 0;
  citasCanceladas: number = 0;

  constructor(
    private router: Router,
    private pacienteService: AdminPacienteService,
    private tokenService: TokenService,
    private logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarCitasHoy();
    this.cargarCitasCanceladas();
    console.log('Token actual:', this.tokenService.getToken());
  }

  // 🔹 Traer todos los pacientes y contar
  cargarPacientes() {
    this.pacienteService.listarPacientes(0, 1000).subscribe({
      next: (pacientes: PacienteDto[]) => {
        this.pacientesActivos = pacientes.length;
      },
      error: (err) => console.error('Error cargando pacientes', err),
    });
  }

  // 🔹 Placeholder: cargar citas activas de hoy
  cargarCitasHoy() {
    // Aquí deberías usar el servicio de citas si tienes uno
    this.citasActivasHoy = 15; // valor de ejemplo
  }

  // 🔹 Placeholder: cargar citas canceladas
  cargarCitasCanceladas() {
    // Aquí deberías usar el servicio de citas canceladas
    this.citasCanceladas = 3; // valor de ejemplo
  }

  // 🔹 Gestión de usuarios
  crearMedico() {
    this.router.navigate(['/admin/registro-medicos']);
  }

  crearAdministrador() {
    this.router.navigate(['/admin/agregar-administrador']);
  }

  editarPaciente() {
    this.router.navigate(['/admin/registro-pacientes']);
  }

  // 🔹 Gestión de catálogos
  gestionarEspecialidades() {
    this.router.navigate(['/admin/agregar-especialidad']);
  }

  gestionarMedicamentos() {
    this.router.navigate(['/admin/agregar-medicamento']);
  }

  // 🔹 Cerrar sesión
  cerrarSesion() {
    this.logoutService.logout();
  }

  // Navegación de los links del header
  irDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
}
