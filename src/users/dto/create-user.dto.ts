import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Auth0 user ID',
    example: 'auth0|123456789',
  })
  @IsString()
  auth0UserId: string;

  @ApiPropertyOptional({
    description: 'ID of the associated employee',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  empleadoId?: number;
}