import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MenuResponseDto {
  @ApiProperty({
    description: 'Menu ID',
    example: 1,
  })
  menuId: number;

  @ApiProperty({
    description: 'Menu name',
    example: 'User Management',
  })
  nombre: string;

  @ApiProperty({
    description: 'Menu route',
    example: '/users',
  })
  ruta: string;

  @ApiPropertyOptional({
    description: 'Menu icon name',
    example: 'users',
  })
  icono?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-09-20T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-09-20T12:00:00Z',
  })
  updatedAt: Date;
}