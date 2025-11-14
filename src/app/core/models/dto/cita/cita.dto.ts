import { EstadoCita } from '../../enums/estado-cita.enum';

export interface CitaDto {
  id: number;
  observaciones: string;
  estadoCita: EstadoCita;
  idPaciente: number;
  idMedico: number;
  idFormula: number;
  idAgenda: number;
}
