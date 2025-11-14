import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LoginDto } from '../../../core/models/dto/auth/login.dto';
import { ValidarLoginService } from './services/validar-login.service';
import { ToastService } from '../../../components/toast/service/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validarLoginService: ValidarLoginService,
    private toast: ToastService,
    private router: Router
  ) {
    // Create login form
    // Crear formulario de login
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Método que se ejecuta al enviar el formulario
   * Method executed when submitting the form
   */
  login(): void {
    if (this.loginForm.invalid) {
      this.toast.show('Debes llenar todos los campos', 'error');
      return;
    }

    const loginDto: LoginDto = {
      email: this.loginForm.value.usuario.trim(),
      password: this.loginForm.value.password,
    };

    // Call AuthService to connect with backend
    // Llamar al AuthService para conectar con el backend
    this.authService.login(loginDto).subscribe({
      next: (tokenDto) => {
        // Save token
        // Guardar token
        localStorage.setItem('token', tokenDto.token);

        // Redirect based on role
        // Redirigir según el rol
        this.validarLoginService.redirigirSegunRol();
      },
      error: () => {
        // Show error toast
        // Mostrar toast de error
        this.toast.show('Credenciales incorrectas', 'error');
      },
    });
  }
}
