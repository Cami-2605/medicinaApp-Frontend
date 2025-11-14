// medicamento.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../app.config';
import { RegistrarMedicamentoDto } from '../../models/dto/medicamento/registrar-medicamento.dto';
import { MensajeDto } from '../../models/dto/mensaje.dto';
import { MedicamentoDto } from '../../models/dto/medicamento/medicamento.dto';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  // URL base para operaciones de medicamentos
  private apiUrl = `${API_URL.baseUrl}/api/admin/medicamento`;

  constructor(private http: HttpClient) {}

  /**
   * Registrar un nuevo medicamento
   */
  registrarMedicamento(dto: RegistrarMedicamentoDto): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/registro`, dto, { headers }).pipe(
      map((response) => {
        // Extraer mensaje del backend
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error registrando medicamento: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error registrando medicamento', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Obtener medicamento por su ID
   */
  obtenerMedicamentoPorId(id: number): Observable<MedicamentoDto> {
    return this.http.get<MensajeDto<MedicamentoDto>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo medicamento: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo medicamento', err);
        return throwError(() => err);
      })
    );
  }

  /**
   * Listar todos los medicamentos
   */
  listarMedicamentos(): Observable<MedicamentoDto[]> {
    return this.http.get<MensajeDto<MedicamentoDto[]>>(`${this.apiUrl}/listar`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error listando medicamentos: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error listando medicamentos', err);
        return throwError(() => err);
      })
    );
  }
}
