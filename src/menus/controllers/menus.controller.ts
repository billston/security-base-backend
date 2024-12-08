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
import { MenusService } from '../services/menus.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenuResponseDto } from '../dto/menu-response.dto';

@ApiTags('menus')
@Controller('menus')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 201, type: MenuResponseDto })
  async create(
    @Body() createMenuDto: CreateMenuDto,
    @Request() req,
  ): Promise<MenuResponseDto> {
    return this.menusService.create(createMenuDto, req.user.usuarioId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, type: [MenuResponseDto] })
  async findAll(): Promise<MenuResponseDto[]> {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, type: MenuResponseDto })
  async findOne(@Param('id') id: number): Promise<MenuResponseDto> {
    return this.menusService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a menu' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, type: MenuResponseDto })
  async update(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
    @Request() req,
  ): Promise<MenuResponseDto> {
    return this.menusService.update(id, updateMenuDto, req.user.usuarioId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 204, description: 'Menu deleted successfully' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.menusService.remove(id);
  }
}