import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../../app.config';

import { MensajeDto } from '../../models/dto/mensaje.dto';
import { FormulaDto } from '../../models/dto/formula/formula.dto';
import { DetalleFormulaDto } from '../../models/dto/detalleFormula/detalle-formula.dto';

@Injectable({
  providedIn: 'root',
})
export class PacienteFormulaService {
  // Base URL del backend
  private apiUrl = `${API_URL.baseUrl}/api/paciente`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las fórmulas de un paciente
   */
  obtenerFormulasPaciente(idPaciente: number): Observable<MensajeDto<FormulaDto[]>> {
    return this.http.get<MensajeDto<FormulaDto[]>>(`${this.apiUrl}/${idPaciente}/formula`);
  }

  /**
   * Obtener una fórmula específica por ID
   */
  obtenerFormula(idFormula: number): Observable<MensajeDto<FormulaDto>> {
    return this.http.get<MensajeDto<FormulaDto>>(`${this.apiUrl}/formula/${idFormula}`);
  }

  /**
   * Obtener los detalles de una fórmula
   */
  obtenerDetallesFormula(idFormula: number): Observable<MensajeDto<DetalleFormulaDto[]>> {
    return this.http.get<MensajeDto<DetalleFormulaDto[]>>(
      `${this.apiUrl}/formula/${idFormula}/detalles`
    );
  }
}
