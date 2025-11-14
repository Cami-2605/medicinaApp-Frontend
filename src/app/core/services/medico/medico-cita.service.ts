import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../app.config';
import { CitaDto } from '../../models/dto/cita/cita.dto';
import { MensajeDto } from '../../models/dto/mensaje.dto';
import { CambiarEstadoCitaDto } from '../../models/dto/cita/cambiar-estado-cita.dto';
import { RegistroFormulaDto } from '../../models/dto/formula/registro-formula.dto';

@Injectable({
  providedIn: 'root',
})
export class MedicoCitaService {
  // Base URL del backend
  private apiUrl = `${API_URL.baseUrl}/api/medico`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las citas asociadas a un médico por su ID.
   */
  obtenerCitasMedico(idMedico: number): Observable<MensajeDto<CitaDto[]>> {
    return this.http.get<MensajeDto<CitaDto[]>>(`${this.apiUrl}/${idMedico}/citas`);
  }

  /**
   * Obtiene una cita por su ID.
   */
  obtenerCitaPorId(idCita: number): Observable<MensajeDto<CitaDto>> {
    return this.http.get<MensajeDto<CitaDto>>(`${this.apiUrl}/citas/${idCita}`);
  }

  /**
   * Cambia el estado de una cita a EN_REVISION.
   */
  ponerEnRevision(dto: CambiarEstadoCitaDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/citas/revision`, dto);
  }

  /**
   * Registra una fórmula médica asociada a una cita.
   */
  registrarFormula(dto: RegistroFormulaDto): Observable<MensajeDto<string>> {
    return this.http.post<MensajeDto<string>>(`${this.apiUrl}/cita/formula/registro`, dto);
  }
}
