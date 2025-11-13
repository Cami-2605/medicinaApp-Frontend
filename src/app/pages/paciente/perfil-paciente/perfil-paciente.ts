import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-paciente.html',
  styleUrls: ['./perfil-paciente.css']
})
export class PerfilPacienteComponent {
  constructor(private router: Router) {}

  paciente = {
    nombres: 'Juan',
    apellidos: 'Pérez Gómez',
    documento: '1234567890',
    fechaNacimiento: '1990-05-15',
    email: 'juan.perez@example.com',
    nombreUsuario: 'juanperez90',
    telefono: '+57 310 123 4567',
    direccion: 'Calle 45 #12-34, Bogotá'
  };

  actualizarPerfil() {
    alert(`✅ Perfil actualizado correctamente.\nNombre: ${this.paciente.nombres} ${this.paciente.apellidos}`);
  }

  eliminarPerfil() {
    const confirmar = confirm('⚠️ ¿Seguro que deseas eliminar tu perfil? Esta acción no se puede deshacer.');
    if (confirmar) {
      alert('Perfil eliminado exitosamente.');
      this.router.navigate(['/login']);
    }
  }

  regresarDashboard() {
    this.router.navigate(['/dashboard-paciente']);
  }
}