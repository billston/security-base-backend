import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth0Service } from './auth0.service';
import { Usuario } from '../../entities/usuario.entity';
import { TokenResponseDto } from '../dto/token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private auth0Service: Auth0Service,
    private jwtService: JwtService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async validateAuth0Token(token: string): Promise<TokenResponseDto> {
    const auth0User = await this.auth0Service.validateToken(token);
    
    let usuario = await this.usuarioRepository.findOne({
      where: { auth0UserId: auth0User.sub },
      relations: ['perfiles', 'perfiles.menus'],
    });

    if (!usuario) {
      throw new UnauthorizedException('User not registered in the system');
    }

    const payload = {
      sub: usuario.usuarioId,
      auth0Id: usuario.auth0UserId,
      perfiles: usuario.perfiles.map(perfil => perfil.perfilId),
    };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 3600,
    };
  }

  async refreshToken(userId: number): Promise<TokenResponseDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId: userId },
      relations: ['perfiles'],
    });

    if (!usuario) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: usuario.usuarioId,
      auth0Id: usuario.auth0UserId,
      perfiles: usuario.perfiles.map(perfil => perfil.perfilId),
    };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 3600,
    };
  }
}