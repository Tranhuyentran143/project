import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'adminName' })
  adminName?: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'email' })
  email?: string;

  @Column({ name: 'role' })
  role?: string;

  @Column({ name: 'userName' })
  userName: string;

  @Column({ name: 'password' })
  password: string;
}

