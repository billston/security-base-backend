import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from '../../entities/menu.entity';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenuResponseDto } from '../dto/menu-response.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  private toResponseDto(menu: Menu): MenuResponseDto {
    return {
      menuId: menu.menuId,
      nombre: menu.nombre,
      ruta: menu.ruta,
      icono: menu.icono,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    };
  }

  async create(createMenuDto: CreateMenuDto, currentUserId: number): Promise<MenuResponseDto> {
    const menu = this.menuRepository.create({
      ...createMenuDto,
      createdBy: currentUserId,
    });

    await this.menuRepository.save(menu);
    return this.toResponseDto(menu);
  }

  async findAll(): Promise<MenuResponseDto[]> {
    const menus = await this.menuRepository.find();
    return menus.map(menu => this.toResponseDto(menu));
  }

  async findOne(id: number): Promise<MenuResponseDto> {
    const menu = await this.menuRepository.findOne({
      where: { menuId: id },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.toResponseDto(menu);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto, currentUserId: number): Promise<MenuResponseDto> {
    const menu = await this.menuRepository.findOne({
      where: { menuId: id },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    if (updateMenuDto.nombre !== undefined) {
      menu.nombre = updateMenuDto.nombre;
    }

    if (updateMenuDto.ruta !== undefined) {
      menu.ruta = updateMenuDto.ruta;
    }

    if (updateMenuDto.icono !== undefined) {
      menu.icono = updateMenuDto.icono;
    }

    menu.updatedBy = currentUserId;
    await this.menuRepository.save(menu);

    return this.toResponseDto(menu);
  }

  async remove(id: number): Promise<void> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }
}