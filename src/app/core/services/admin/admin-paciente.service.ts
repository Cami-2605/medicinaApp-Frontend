import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API_URL } from '../../../app.config';

import { RegistrarPacienteDto } from '../../models/dto/paciente/registrar-paciente.dto';
import { PacienteDto } from '../../models/dto/paciente/paciente.dto';
import { MensajeDto } from '../../models/dto/mensaje.dto';
import { CitaDto } from '../../models/dto/cita/cita.dto';
import { FormulaDto } from '../../models/dto/formula/formula.dto';
import { DetalleFormulaDto } from '../../models/dto/detalleFormula/detalle-formula.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminPacienteService {
  // Base URL para operaciones de pacientes
  private apiUrl = `${API_URL.baseUrl}/api/admin/paciente`;

  constructor(private http: HttpClient) {}

  // Registrar paciente
  registrarPaciente(dto: RegistrarPacienteDto): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/registro`, dto, { headers }).pipe(
      map((response) => {
        // Extraer mensaje del backend
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error registrando paciente: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error registrando paciente', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener paciente por ID
  obtenerPacientePorId(id: number): Observable<PacienteDto> {
    return this.http.get<MensajeDto<PacienteDto>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo paciente: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo paciente', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener paciente por email
  obtenerPacientePorEmail(email: string): Observable<PacienteDto> {
    return this.http
      .get<MensajeDto<PacienteDto>>(`${this.apiUrl}/buscar-email?email=${email}`)
      .pipe(
        map((response) => {
          if (response && !response.error) {
            return response.mensaje;
          } else {
            throw new Error('Error obteniendo paciente: ' + response.mensaje);
          }
        }),
        catchError((err) => {
          console.error('Error obteniendo paciente por email', err);
          return throwError(() => err);
        })
      );
  }

  // Listar pacientes con filtros
  listarPacientes(
    pagina: number = 0,
    size: number = 10,
    idEps?: number,
    idCiudad?: number
  ): Observable<PacienteDto[]> {
    let url = `${this.apiUrl}/listar?pagina=${pagina}&size=${size}`;

    if (idEps !== undefined) url += `&idEps=${idEps}`;
    if (idCiudad !== undefined) url += `&idCiudad=${idCiudad}`;

    return this.http.get<MensajeDto<PacienteDto[]>>(url).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error listando pacientes: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error listando pacientes', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener citas del paciente
  obtenerCitas(idPaciente: number): Observable<CitaDto[]> {
    return this.http.get<MensajeDto<CitaDto[]>>(`${this.apiUrl}/${idPaciente}/citas`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo citas del paciente: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo citas del paciente', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener fórmulas del paciente
  obtenerFormulas(idPaciente: number): Observable<FormulaDto[]> {
    return this.http.get<MensajeDto<FormulaDto[]>>(`${this.apiUrl}/${idPaciente}/formula`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo fórmulas: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo fórmulas del paciente', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener una fórmula por ID
  obtenerFormula(idFormula: number): Observable<FormulaDto> {
    return this.http
      .get<MensajeDto<FormulaDto>>(`${API_URL.baseUrl}/api/admin/paciente/formula/${idFormula}`)
      .pipe(
        map((response) => {
          if (response && !response.error) {
            return response.mensaje;
          } else {
            throw new Error('Error obteniendo fórmula: ' + response.mensaje);
          }
        }),
        catchError((err) => {
          console.error('Error obteniendo fórmula', err);
          return throwError(() => err);
        })
      );
  }

  // Obtener detalles de fórmula
  obtenerDetallesFormula(idFormula: number): Observable<DetalleFormulaDto[]> {
    return this.http
      .get<MensajeDto<DetalleFormulaDto[]>>(
        `${API_URL.baseUrl}/api/admin/paciente/formula/${idFormula}/detalles`
      )
      .pipe(
        map((response) => {
          if (response && !response.error) {
            return response.mensaje;
          } else {
            throw new Error('Error obteniendo detalles de fórmula: ' + response.mensaje);
          }
        }),
        catchError((err) => {
          console.error('Error obteniendo detalles de fórmula', err);
          return throwError(() => err);
        })
      );
  }
}
