// eps.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../app.config';
import { RegistrarEpsDto } from '../../models/dto/eps/registro-eps.dto';
import { MensajeDto } from '../../models/dto/mensaje.dto';
import { EpsDto } from '../../models/dto/eps/eps.dto';

@Injectable({
  providedIn: 'root',
})
export class EpsService {
  // URL base para operaciones de EPS
  private apiUrl = `${API_URL.baseUrl}/api/admin/eps`;

  constructor(private http: HttpClient) {}

  /**
   * Registrar una nueva EPS en el sistema
   */
  registrarEps(dto: RegistrarEpsDto): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/registrar`, dto, { headers }).pipe(
      map((response) => {
        //  Extraer mensaje del backend
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error registrando EPS: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error registrando EPS', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Obtener EPS usando su ID
   */
  obtenerEpsPorId(id: number): Observable<EpsDto> {
    return this.http.get<MensajeDto<EpsDto>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo EPS: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo EPS', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Listar todas las EPS registradas en el sistema
   */
  listarEps(): Observable<EpsDto[]> {
    return this.http.get<MensajeDto<EpsDto[]>>(`${this.apiUrl}/listar`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error listando EPS: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error listando EPS', err);
        return throwError(() => err);
      })
    );
  }
}
