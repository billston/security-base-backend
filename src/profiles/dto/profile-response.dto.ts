import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuResponseDto } from '../../menus/dto/menu-response.dto';

export class ProfileResponseDto {
  @ApiProperty({
    description: 'Profile ID',
    example: 1,
  })
  perfilId: number;

  @ApiProperty({
    description: 'Profile name',
    example: 'Administrator',
  })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Profile description',
    example: 'Full system access',
  })
  descripcion?: string;

  @ApiProperty({
    description: 'Assigned menus',
    type: [MenuResponseDto],
  })
  menus: MenuResponseDto[];

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