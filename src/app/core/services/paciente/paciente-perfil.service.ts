import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../../app.config';

import { MensajeDto } from '../../models/dto/mensaje.dto';
import { PacienteDto } from '../../models/dto/paciente/paciente.dto';
import { EditarPacienteDto } from '../../models/dto/paciente/editar-paciente.dto';
import { EliminarPacienteDto } from '../../models/dto/paciente/eliminar-paciente.dto';
import { EditarUserDto } from '../../models/dto/common/user/editar-user.dto';
import { CambiarContraseniaDto } from '../../models/dto/common/user/cambiar-contrasenia.dto';

@Injectable({
  providedIn: 'root',
})
export class PacientePerfilService {
  // Base URL del backend
  private apiUrl = `${API_URL.baseUrl}/api/paciente`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener paciente por ID
   */
  obtenerPacientePorId(id: number): Observable<MensajeDto<PacienteDto>> {
    return this.http.get<MensajeDto<PacienteDto>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener paciente por email
   */
  obtenerPacientePorEmail(email: string): Observable<MensajeDto<PacienteDto>> {
    return this.http.get<MensajeDto<PacienteDto>>(`${this.apiUrl}/buscar-email`, {
      params: { email },
    });
  }

  /**
   * Editar información general del paciente
   */
  editarPerfil(dto: EditarPacienteDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/editar-perfil`, dto);
  }

  /**
   * Editar el email del paciente
   */
  editarEmail(dto: EditarUserDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/editar-email`, dto);
  }

  /**
   * Editar contraseña del paciente
   */
  editarPassword(dto: CambiarContraseniaDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/editar-password`, dto);
  }

  /**
   * Eliminar cuenta del paciente (cambiar estado)
   */
  eliminarPaciente(dto: EliminarPacienteDto): Observable<MensajeDto<string>> {
    return this.http.request<MensajeDto<string>>('delete', `${this.apiUrl}/eliminar-perfil`, {
      body: dto,
    });
  }
}
