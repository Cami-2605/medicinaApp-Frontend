import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-administrador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-administrador.html',
  styleUrls: ['./dashboard-administrador.css']
})
export class DashboardAdministradorComponent {

  constructor(private router: Router) {}

  // 🔹 Gestión de usuarios
  crearMedico() {
    this.router.navigate(['/registro-medicos']);
  }

  crearAdministrador() {
    this.router.navigate(['/registro-pacientes']); // puedes cambiarlo si tienes otra ruta
  }

  editarPaciente() {
    this.router.navigate(['/registro-pacientes']);
  }

  // 🔹 Gestión de catálogos
  gestionarEspecialidades() {
    this.router.navigate(['/agregar-editar-especialidad']);
  }

  gestionarMedicamentos() {
    this.router.navigate(['/agregar-editar-medicamento']);
  }

  // 🔹 Cerrar sesión
  cerrarSesion() {
    this.router.navigate(['/login']);
  }
}