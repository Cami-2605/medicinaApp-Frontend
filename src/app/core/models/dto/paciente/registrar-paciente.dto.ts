import { RegistroTelefonoDto } from '../common/telefono/registro-telefono.dto';
import { CrearUserDto } from '../common/user/crear-user.dto';

export interface RegistrarPacienteDto {
  nombre: string;
  crearUserDto: CrearUserDto;
  idEps: number;
  idCiudad: number;
  telefonos: RegistroTelefonoDto[];
}
