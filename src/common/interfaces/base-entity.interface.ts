export interface IBaseEntity {
  createdBy: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
}