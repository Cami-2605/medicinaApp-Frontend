import { TipoAlerta } from '../../enums/tipo-alerta.enum';

export interface AlertaDto {
  id: number;
  tipoAlerta: TipoAlerta;
  mensaje: string;
  fechaRegistro: string;
  isLeida: boolean;
  idPaciente: number;
}
