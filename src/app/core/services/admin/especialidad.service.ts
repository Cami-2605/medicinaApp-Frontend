import { AgregarEspecialidadDt } from './../../models/dto/especialidad/agregar-especialidad.dto';
// especialidad.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../app.config';
import { MensajeDto } from '../../models/dto/mensaje.dto';
import { EspecialidadDto } from '../../models/dto/especialidad/especialidad.dto';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  // URL base para operaciones de especialidades
  private apiUrl = `${API_URL.baseUrl}/api/admin/especialidad`;

  constructor(private http: HttpClient) {}

  /**
   * Registrar una nueva especialidad
   */
  registrarEspecialidad(dto: AgregarEspecialidadDt): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/registro`, dto, { headers }).pipe(
      map((response) => {
        // Extraer mensaje del backend
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error registrando especialidad: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error registrando especialidad', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Obtener especialidad por su ID
   */
  obtenerEspecialidadPorId(id: number): Observable<EspecialidadDto> {
    return this.http.get<MensajeDto<EspecialidadDto>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo especialidad: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo especialidad', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Listar todas las especialidades
   */
  listarEspecialidades(): Observable<EspecialidadDto[]> {
    return this.http.get<MensajeDto<EspecialidadDto[]>>(`${this.apiUrl}/listar`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error listando especialidades: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error listando especialidades', err);
        return throwError(() => err);
      })
    );
  }
}
