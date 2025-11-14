import { UserDto } from '../common/user/user.dto';

export interface AdminDto {
  id: number;
  nombre: string;
  user: UserDto;
}
