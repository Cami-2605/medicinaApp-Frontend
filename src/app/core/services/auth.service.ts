// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../app.config';
import { LoginDto } from '../models/dto/auth/login.dto';
import { TokenDto } from '../models/dto/token.dto';
import { MensajeDto } from '../models/dto/mensaje.dto';

// Import DTOs

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL base del endpoint de autenticación en el backend.
  private apiUrl = `${API_URL.baseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  /**
   * Login method
   * Método para iniciar sesión enviando el LoginDto al backend
   */
  login(loginDto: LoginDto): Observable<TokenDto> {
    return this.http.post<MensajeDto<TokenDto>>(`${this.apiUrl}/login`, loginDto).pipe(
      map((response) => {
        // El backend envía MensajeDto<TokenDto>, extraemos TokenDto
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error en login: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Login error', err);
        return throwError(() => err);
      })
    );
  }
}
