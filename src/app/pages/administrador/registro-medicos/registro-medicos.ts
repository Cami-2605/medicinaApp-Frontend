import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-medicos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-medicos.html',
  styleUrls: ['./registro-medicos.css'],
})
export class RegistroMedicosComponent {
  nuevoMedico = {
    nombres: '',
    apellidos: '',
    documento: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    direccion: '',
    especialidad: '',
    usuario: '',
    contrasena: '',
  };

  constructor(private router: Router) {}

  registrarMedico() {
    console.log('Datos del médico:', this.nuevoMedico);
    alert('Médico registrado exitosamente ✅');
    this.router.navigate(['/admin-dashboard']);
  }
}