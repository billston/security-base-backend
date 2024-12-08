import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Perfil } from '../../entities/perfil.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
  ) {}

  private async validatePerfiles(perfilIds: number[]): Promise<Perfil[]> {
    const perfiles = await this.perfilRepository.findByIds(perfilIds);
    if (perfiles.length !== perfilIds.length) {
      throw new BadRequestException('One or more profile IDs are invalid');
    }
    return perfiles;
  }

  private toResponseDto(usuario: Usuario): UserResponseDto {
    return {
      usuarioId: usuario.usuarioId,
      auth0UserId: usuario.auth0UserId,
      empleadoId: usuario.empleadoId,
      perfiles: usuario.perfiles.map(perfil => perfil.perfilId),
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    };
  }

  async create(createUserDto: CreateUserDto, currentUserId: number): Promise<UserResponseDto> {
    const usuario = this.usuarioRepository.create({
      ...createUserDto,
      createdBy: currentUserId,
      perfiles: [],
    });

    await this.usuarioRepository.save(usuario);
    return this.toResponseDto(usuario);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const usuarios = await this.usuarioRepository.find({
      relations: ['perfiles'],
    });
    return usuarios.map(usuario => this.toResponseDto(usuario));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId: id },
      relations: ['perfiles'],
    });

    if (!usuario) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.toResponseDto(usuario);
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUserId: number): Promise<UserResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId: id },
      relations: ['perfiles'],
    });

    if (!usuario) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.perfilIds) {
      usuario.perfiles = await this.validatePerfiles(updateUserDto.perfilIds);
    }

    if (updateUserDto.empleadoId !== undefined) {
      usuario.empleadoId = updateUserDto.empleadoId;
    }

    usuario.updatedBy = currentUserId;
    await this.usuarioRepository.save(usuario);

    return this.toResponseDto(usuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async assignProfiles(userId: number, profileIds: number[], currentUserId: number): Promise<UserResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId: userId },
      relations: ['perfiles'],
    });

    if (!usuario) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    usuario.perfiles = await this.validatePerfiles(profileIds);
    usuario.updatedBy = currentUserId;

    await this.usuarioRepository.save(usuario);
    return this.toResponseDto(usuario);
  }
}