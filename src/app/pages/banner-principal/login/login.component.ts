import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const user = this.usuario.trim().toLowerCase();
    const pass = this.password;

    // Simulación de autenticación según el tipo de usuario
    if (user === 'admin' && pass === '1234') {
      this.router.navigate(['/dashboard-administrador']);
    } else if (user === 'medico' && pass === '1234') {
      this.router.navigate(['/medico-dashboard']);
    } else if (user === 'paciente' && pass === '1234') {
      this.router.navigate(['/dashboard-paciente']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}