import { IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'ID of the associated employee',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  empleadoId?: number;

  @ApiPropertyOptional({
    description: 'Array of profile IDs to assign to the user',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  perfilIds?: number[];
}