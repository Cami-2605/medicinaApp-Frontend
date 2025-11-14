import { AgendaDto } from '../agenda/agenda.dto';
import { CitaDto } from '../cita/cita.dto';
import { TelefonoDto } from '../common/telefono/telefono.dto';
import { UserDto } from '../common/user/user.dto';

export interface MedicoDto {
  id: number;
  nombre: string;
  user: UserDto;
  telefonos: TelefonoDto[];
  idEspecialidad: number;
  citas: CitaDto[];
  agenda: AgendaDto[];
}
