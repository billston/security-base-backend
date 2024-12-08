import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Empleado } from './empleado.entity';
import { Perfil } from './perfil.entity';

@Entity('usuario')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ name: 'auth0_user_id', unique: true })
  auth0UserId: string;

  @Column({ name: 'empleado_id', nullable: true })
  empleadoId?: number;

  @OneToOne(() => Empleado, empleado => empleado.usuario)
  @JoinColumn({ name: 'empleado_id' })
  empleado?: Empleado;

  @ManyToMany(() => Perfil)
  @JoinTable({
    name: 'usuario_perfil',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'perfil_id' }
  })
  perfiles: Perfil[];
}