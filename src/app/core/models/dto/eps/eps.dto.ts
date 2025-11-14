import { PacienteDto } from '../paciente/paciente.dto';

export interface EpsDto {
  id: number;
  nombre: string;
  pacientes: PacienteDto[];
}
