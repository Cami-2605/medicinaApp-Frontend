// validar-login.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/interceptors/token.service';

@Injectable({
  providedIn: 'root',
})
// Redirigir al usuario según el rol y expiración del token.
export class ValidarLoginService {
  constructor(private tokenService: TokenService, private router: Router) {}

  /**
   * Redirige al usuario según el rol contenido en el token
   * Si el token no existe o está expirado, redirige al inicio
   */
  redirigirSegunRol(): void {
    const token = this.tokenService.getToken();

    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    const decoded: any = this.tokenService.decodeToken(token); // usamos método de TokenService

    if (!decoded || !decoded.rol || !decoded.exp) {
      this.router.navigate(['/']);
      return;
    }

    // Validar expiración
    const ahora = Math.floor(Date.now() / 1000);
    if (decoded.exp <= ahora) {
      this.router.navigate(['/']);
      return;
    }

    // Guardar rol en el localStorage
    localStorage.setItem('rolUsuario', decoded.rol);

    // Redirigir según rol
    switch (decoded.rol) {
      case 'ROLE_PACIENTE':
        this.router.navigate(['/paciente/dashboard']);
        break;
      case 'ROLE_MEDICO':
        this.router.navigate(['/medico/dashboard']);
        break;
      case 'ROLE_ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
