import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id?: number;

  @Expose()
  userName: string;

  @Expose()
  age: number;

  @Expose()
  address: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  password: string;
}
