import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Menu } from './menu.entity';

@Entity('perfil')
export class Perfil extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'perfil_id' })
  perfilId: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'perfil_menu',
    joinColumn: { name: 'perfil_id' },
    inverseJoinColumn: { name: 'menu_id' }
  })
  menus: Menu[];
}