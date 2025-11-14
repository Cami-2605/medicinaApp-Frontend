import { MedicoDto } from '../medico/medico.dto';

export interface EspecialidadDto {
  id: number;
  especialidad: string;
  medicos: MedicoDto[];
}
