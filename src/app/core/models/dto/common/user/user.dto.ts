import { EstadoUser } from '../../../enums/estado-user.enum';

export interface UserDto {
  email: string;
  password: string;
  estadoUser: EstadoUser;
}
