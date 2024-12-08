import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Profile name',
    example: 'Administrator',
  })
  @IsString()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Profile description',
    example: 'Full system access',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Array of menu IDs to assign to the profile',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  menuIds?: number[];
}