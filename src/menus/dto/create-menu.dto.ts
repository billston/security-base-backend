import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Menu name',
    example: 'User Management',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Menu route',
    example: '/users',
  })
  @IsString()
  ruta: string;

  @ApiPropertyOptional({
    description: 'Menu icon name',
    example: 'users',
  })
  @IsString()
  @IsOptional()
  icono?: string;
}