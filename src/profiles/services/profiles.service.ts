import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfil } from '../../entities/perfil.entity';
import { Menu } from '../../entities/menu.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileResponseDto } from '../dto/profile-response.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  private async validateMenus(menuIds: number[]): Promise<Menu[]> {
    const menus = await this.menuRepository.findByIds(menuIds);
    if (menus.length !== menuIds.length) {
      throw new BadRequestException('One or more menu IDs are invalid');
    }
    return menus;
  }

  private toResponseDto(perfil: Perfil): ProfileResponseDto {
    return {
      perfilId: perfil.perfilId,
      nombre: perfil.nombre,
      descripcion: perfil.descripcion,
      menus: perfil.menus?.map(menu => ({
        menuId: menu.menuId,
        nombre: menu.nombre,
        ruta: menu.ruta,
        icono: menu.icono,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
      })) || [],
      createdAt: perfil.createdAt,
      updatedAt: perfil.updatedAt,
    };
  }

  async create(createProfileDto: CreateProfileDto, currentUserId: number): Promise<ProfileResponseDto> {
    const perfil = this.perfilRepository.create({
      ...createProfileDto,
      createdBy: currentUserId,
    });

    if (createProfileDto.menuIds) {
      perfil.menus = await this.validateMenus(createProfileDto.menuIds);
    }

    await this.perfilRepository.save(perfil);
    return this.toResponseDto(perfil);
  }

  async findAll(): Promise<ProfileResponseDto[]> {
    const perfiles = await this.perfilRepository.find({
      relations: ['menus'],
    });
    return perfiles.map(perfil => this.toResponseDto(perfil));
  }

  async findOne(id: number): Promise<ProfileResponseDto> {
    const perfil = await this.perfilRepository.findOne({
      where: { perfilId: id },
      relations: ['menus'],
    });

    if (!perfil) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return this.toResponseDto(perfil);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto, currentUserId: number): Promise<ProfileResponseDto> {
    const perfil = await this.perfilRepository.findOne({
      where: { perfilId: id },
      relations: ['menus'],
    });

    if (!perfil) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    if (updateProfileDto.nombre !== undefined) {
      perfil.nombre = updateProfileDto.nombre;
    }

    if (updateProfileDto.descripcion !== undefined) {
      perfil.descripcion = updateProfileDto.descripcion;
    }

    if (updateProfileDto.menuIds) {
      perfil.menus = await this.validateMenus(updateProfileDto.menuIds);
    }

    perfil.updatedBy = currentUserId;
    await this.perfilRepository.save(perfil);

    return this.toResponseDto(perfil);
  }

  async remove(id: number): Promise<void> {
    const result = await this.perfilRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }

  async assignMenus(profileId: number, menuIds: number[], currentUserId: number): Promise<ProfileResponseDto> {
    const perfil = await this.perfilRepository.findOne({
      where: { perfilId: profileId },
      relations: ['menus'],
    });

    if (!perfil) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }

    perfil.menus = await this.validateMenus(menuIds);
    perfil.updatedBy = currentUserId;

    await this.perfilRepository.save(perfil);
    return this.toResponseDto(perfil);
  }
}