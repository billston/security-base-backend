import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiPropertyOptional({
    description: 'Menu name',
    example: 'User Management',
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Menu route',
    example: '/users',
  })
  @IsString()
  @IsOptional()
  ruta?: string;

  @ApiPropertyOptional({
    description: 'Menu icon name',
    example: 'users',
  })
  @IsString()
  @IsOptional()
  icono?: string;
}