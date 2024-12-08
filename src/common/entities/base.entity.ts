import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';

export abstract class BaseEntity implements IBaseEntity {
  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}