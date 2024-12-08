import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Usuario } from './usuario.entity';

@Entity('empleado')
export class Empleado extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'empleado_id' })
  empleadoId: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'fecha_nacimiento', nullable: true })
  fechaNacimiento?: Date;

  @Column({ name: 'documento_identidad', nullable: true, unique: true })
  documentoIdentidad?: string;

  @Column({ nullable: true })
  cargo?: string;

  @Column({ nullable: true })
  telefono?: string;

  @OneToOne(() => Usuario, usuario => usuario.empleado)
  usuario?: Usuario;
}