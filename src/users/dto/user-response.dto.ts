import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  usuarioId: number;

  @ApiProperty({
    description: 'Auth0 user ID',
    example: 'auth0|123456789',
  })
  auth0UserId: string;

  @ApiPropertyOptional({
    description: 'Associated employee ID',
    example: 1,
  })
  empleadoId?: number;

  @ApiProperty({
    description: 'Array of profile IDs assigned to the user',
    example: [1, 2, 3],
    type: [Number],
  })
  perfiles: number[];

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