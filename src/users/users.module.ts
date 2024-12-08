import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Usuario } from '../entities/usuario.entity';
import { Perfil } from '../entities/perfil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfil])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}