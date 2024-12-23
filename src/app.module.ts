import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './common/database/naming.strategy';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        try {
          return {
            type: 'postgres',
            host: configService.get('database.host'),
            port: configService.get('database.port'),
            username: configService.get('database.username'),
            password: configService.get('database.password'),
            database: configService.get('database.database'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
            ssl: {
              rejectUnauthorized: false, // Solo para desarrollo
            },
          };
        } catch (error) {
          console.error('Error connecting to the database:', error);
          throw error; // Lanza el error para que sea manejado por NestJS
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProfilesModule,
    MenusModule,
  ],
})
export class AppModule {}