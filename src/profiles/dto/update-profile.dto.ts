import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'Profile name',
    example: 'Administrator',
  })
  @IsString()
  @IsOptional()
  nombre?: string;

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