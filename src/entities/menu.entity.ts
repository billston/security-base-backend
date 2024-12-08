import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('menu')
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'menu_id' })
  menuId: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  ruta: string;

  @Column({ nullable: true })
  icono?: string;
}