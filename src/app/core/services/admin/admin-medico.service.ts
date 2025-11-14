import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../app.config';

import { RegistrarMedicoDto } from '../../models/dto/medico/registrar-medico.dto';
import { EliminarMedicoDto } from '../../models/dto/medico/eliminar-medico.dto';
import { MedicoDto } from '../../models/dto/medico/medico.dto';
import { MensajeDto } from '../../models/dto/mensaje.dto';
import { AgendaDto } from '../../models/dto/agenda/agenda.dto';
import { CitaDto } from '../../models/dto/cita/cita.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminMedicoService {
  // URL base para todos los endpoints de médico admin
  private apiUrl = `${API_URL.baseUrl}/api/admin/medico`;

  constructor(private http: HttpClient) {}

  // Registro médico por parte del admin
  registrarMedico(dto: RegistrarMedicoDto): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/registro`, dto, { headers }).pipe(
      map((response) => {
        // Extrae mensaje si no hay error
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error registrando médico: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error registrando médico', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener médico por ID
  obtenerMedicoPorId(id: number): Observable<MedicoDto> {
    return this.http.get<MensajeDto<MedicoDto>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo médico: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo médico', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener médico por email
  obtenerMedicoPorEmail(email: string): Observable<MedicoDto> {
    return this.http.get<MensajeDto<MedicoDto>>(`${this.apiUrl}/buscar-email?email=${email}`).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error obteniendo médico: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error obteniendo médico por email', err);
        return throwError(() => err);
      })
    );
  }

  // Eliminar médico (cambiar estado)
  eliminarMedico(dto: EliminarMedicoDto): Observable<string> {
    return this.http
      .delete<MensajeDto<string>>(`${this.apiUrl}/eliminar-perfil`, {
        body: dto,
      })
      .pipe(
        map((response) => {
          if (response && !response.error) {
            return response.mensaje;
          } else {
            throw new Error('Error eliminando médico: ' + response.mensaje);
          }
        }),
        catchError((err) => {
          console.error('Error eliminando médico', err);
          return throwError(() => err);
        })
      );
  }

  // Listar médicos según filtros
  listarMedicos(
    pagina: number = 0,
    size: number = 10,
    idEspecialidad?: number
  ): Observable<MedicoDto[]> {
    let url = `${this.apiUrl}/listar?pagina=${pagina}&size=${size}`;

    if (idEspecialidad !== undefined) {
      url += `&idEspecialidad=${idEspecialidad}`;
    }

    return this.http.get<MensajeDto<MedicoDto[]>>(url).pipe(
      map((response) => {
        if (response && !response.error) {
          return response.mensaje;
        } else {
          throw new Error('Error listando médicos: ' + response.mensaje);
        }
      }),
      catchError((err) => {
        console.error('Error listando médicos', err);
        return throwError(() => err);
      })
    );
  }

  // Obtener agenda del médico
  obtenerAgenda(idMedico: number): Observable<AgendaDto[]> {
    return this.http
      .get<MensajeDto<AgendaDto[]>>(`${API_URL.baseUrl}/api/admin/medicos/${idMedico}/agenda`)
      .pipe(
        map((response) => {
          if (response && !response.error) {
            return response.mensaje;
          } else {
            throw new Error('Error obteniendo agenda: ' + response.mensaje);
          }
        }),
        catchError((err) => {
          console.error('Error obteniendo agenda del médico', err);
          return throwError(() => err);
        })
      );
  }

  // Obtener citas del médico
  obtenerCitas(idMedico: number): Observable<CitaDto[]> {
    return this.http
      .get<MensajeDto<CitaDto[]>>(`${API_URL.baseUrl}/api/admin/medico/${idMedico}/citas`)
      .pipe(
        map((response) => {
          if (response && !response.error) {
            return response.mensaje;
          } else {
            throw new Error('Error obteniendo citas: ' + response.mensaje);
          }
        }),
        catchError((err) => {
          console.error('Error obteniendo citas del médico', err);
          return throwError(() => err);
        })
      );
  }
}
