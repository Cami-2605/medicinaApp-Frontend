import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../../app.config';

import { MensajeDto } from '../../models/dto/mensaje.dto';
import { CitaDto } from '../../models/dto/cita/cita.dto';
import { CambiarEstadoCitaDto } from '../../models/dto/cita/cambiar-estado-cita.dto';
import { EspecialidadDto } from '../../models/dto/especialidad/especialidad.dto';
import { MedicoDto } from '../../models/dto/medico/medico.dto';
import { AgendaDto } from '../../models/dto/agenda/agenda.dto';
import { RegistrarCitaDto } from '../../models/dto/cita/registro-cita.dto';

@Injectable({
  providedIn: 'root',
})
export class PacienteCitaService {
  // Base URL del backend
  private apiUrl = `${API_URL.baseUrl}/api/paciente`;

  constructor(private http: HttpClient) {}

  /**
   * Registrar una cita médica
   */
  registrarCita(dto: RegistrarCitaDto): Observable<MensajeDto<string>> {
    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/citas/registro`, dto);
  }

  /**
   * Listar citas pendientes de un paciente
   */
  listarCitasPendientes(idPaciente: number): Observable<CitaDto[]> {
    return this.http.get<CitaDto[]>(`${this.apiUrl}/${idPaciente}/citas/pendientes`);
  }

  /**
   * Listar todas las citas de un paciente
   */
  obtenerCitasPaciente(idPaciente: number): Observable<CitaDto[]> {
    return this.http.get<CitaDto[]>(`${this.apiUrl}/${idPaciente}/citas`);
  }

  /**
   * Obtener una cita mediante su ID
   */
  obtenerCitaPorId(idCita: number): Observable<CitaDto> {
    return this.http.get<CitaDto>(`${this.apiUrl}/citas/${idCita}`);
  }

  /**
   * Cancelar cita médica
   */
  cancelarCita(dto: CambiarEstadoCitaDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/citas/cancelar`, dto);
  }

  /**
   * Listar todas las especialidades médicas
   */
  listarEspecialidades(): Observable<MensajeDto<EspecialidadDto[]>> {
    return this.http.get<MensajeDto<EspecialidadDto[]>>(
      `${this.apiUrl}/citas/registro/especialidades`
    );
  }

  /**
   * Listar médicos según una especialidad
   */
  listarMedicosPorEspecialidad(idEspecialidad: number): Observable<MensajeDto<MedicoDto[]>> {
    return this.http.get<MensajeDto<MedicoDto[]>>(
      `${this.apiUrl}/citas/registro/especialidades/${idEspecialidad}/medicos`
    );
  }

  /**
   * Listar agenda libre de un médico
   */
  listarAgendaMedico(idMedico: number): Observable<MensajeDto<AgendaDto[]>> {
    return this.http.get<MensajeDto<AgendaDto[]>>(
      `${this.apiUrl}/citas/medicos/${idMedico}/agenda`
    );
  }

  obtenerAgendaPorId(idAgenda: number): Observable<AgendaDto> {
    return this.http.get<AgendaDto>(`${this.apiUrl}/cita/agenda/${idAgenda}`);
  }
}
