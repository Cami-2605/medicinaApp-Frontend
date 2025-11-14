import { CitaDto } from '../cita/cita.dto';
import { CiudadDto } from '../common/ciudad.dto';
import { TelefonoDto } from '../common/telefono/telefono.dto';
import { UserDto } from '../common/user/user.dto';
import { FormulaDto } from '../formula/formula.dto';

export interface PacienteDto {
  id: number;
  nombre: string;
  user: UserDto;
  idEps: number;
  ciudad: CiudadDto;
  telefonos: TelefonoDto[];
  citas: CitaDto[];
  formulasMedicas: FormulaDto[];
}
