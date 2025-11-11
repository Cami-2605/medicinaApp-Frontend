import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-pacientes',
  standalone: true,
  imports: [FormsModule],
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
    contrasena: ''
  };

  constructor(private router: Router) {}

  registrarPaciente() {
    console.log('Datos del paciente:', this.paciente);
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }
}