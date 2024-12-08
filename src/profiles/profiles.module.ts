import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfilesService } from './services/profiles.service';
import { Perfil } from '../entities/perfil.entity';
import { Menu } from '../entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfil, Menu])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}