import { RegistroTelefonoDto } from '../common/telefono/registro-telefono.dto';
import { CrearUserDto } from '../common/user/crear-user.dto';

export interface RegistrarMedicoDto {
  nombre: string;
  user: CrearUserDto;
  telefonos: RegistroTelefonoDto[];
  idEspecialidad: number;
}
