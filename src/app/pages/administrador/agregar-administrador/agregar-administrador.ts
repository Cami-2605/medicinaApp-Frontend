import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'agregar-administrador',
  standalone: true,
  templateUrl: './agregar-administrador.html',
  styleUrls: ['./agregar-administrador.css'],
  imports: [CommonModule, FormsModule]
})
export class AgregarAdministradorComponent {
  admin = {
    nombre: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  guardar() {
    if (!this.admin.password || this.admin.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    console.log('Administrador guardado:', this.admin);
    alert('Administrador guardado correctamente');
    this.router.navigate(['/dashboard-administrador']);
  }

  cancelar() {
    this.router.navigate(['/dashboard-administrador']);
  }
}