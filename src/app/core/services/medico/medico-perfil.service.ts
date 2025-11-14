import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../app.config';

import { MensajeDto } from '../../models/dto/mensaje.dto';
import { MedicoDto } from '../../models/dto/medico/medico.dto';
import { EditarMedicoDto } from '../../models/dto/medico/editar-medico.dto';
import { AgendaDto } from '../../models/dto/agenda/agenda.dto';
import { EditarUserDto } from '../../models/dto/common/user/editar-user.dto';
import { CambiarContraseniaDto } from '../../models/dto/common/user/cambiar-contrasenia.dto';

@Injectable({
  providedIn: 'root',
})
export class MedicoPerfilService {
  // Base URL del backend
  private apiUrl = `${API_URL.baseUrl}/api/medico`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener un médico por su ID
   */
  obtenerMedicoPorId(idMedico: number): Observable<MensajeDto<MedicoDto>> {
    return this.http.get<MensajeDto<MedicoDto>>(`${this.apiUrl}/${idMedico}`);
  }

  /**
   * Obtener un médico por email
   */
  obtenerMedicoPorEmail(email: string): Observable<MensajeDto<MedicoDto>> {
    return this.http.get<MensajeDto<MedicoDto>>(`${this.apiUrl}/buscar-email`, {
      params: { email },
    });
  }

  /**
   * Editar perfil general del médico
   */
  editarPerfil(dto: EditarMedicoDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/editar-perfil`, dto);
  }

  /**
   * Editar email del médico
   */
  editarEmail(dto: EditarUserDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/editar-email`, dto);
  }

  /**
   * Cambiar contraseña del médico
   */
  editarPassword(dto: CambiarContraseniaDto): Observable<MensajeDto<string>> {
    return this.http.put<MensajeDto<string>>(`${this.apiUrl}/editar-password`, dto);
  }

  /**
   * Listar agenda del médico
   */
  listarAgenda(idMedico: number): Observable<MensajeDto<AgendaDto[]>> {
    return this.http.get<MensajeDto<AgendaDto[]>>(`${this.apiUrl}/${idMedico}/agenda`);
  }
}
