import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileResponseDto } from '../dto/profile-response.dto';

@ApiTags('profiles')
@Controller('profiles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiResponse({ status: 201, type: ProfileResponseDto })
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.create(createProfileDto, req.user.usuarioId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({ status: 200, type: [ProfileResponseDto] })
  async findAll(): Promise<ProfileResponseDto[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a profile by ID' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async findOne(@Param('id') id: number): Promise<ProfileResponseDto> {
    return this.profilesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a profile' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() req,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.update(id, updateProfileDto, req.user.usuarioId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 204, description: 'Profile deleted successfully' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.profilesService.remove(id);
  }

  @Post(':id/menus')
  @ApiOperation({ summary: 'Assign menus to a profile' })
  @ApiParam({ name: 'id', description: 'Profile ID' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async assignMenus(
    @Param('id') id: number,
    @Body('menuIds') menuIds: number[],
    @Request() req,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.assignMenus(id, menuIds, req.user.usuarioId);
  }
}