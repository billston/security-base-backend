import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, AuthenticationClient } from 'auth0';
import { Auth0User } from '../interfaces/auth0-user.interface';

@Injectable()
export class Auth0Service {
  private managementClient: ManagementClient;
  private authClient: AuthenticationClient;

  constructor(private configService: ConfigService) {
    this.managementClient = new ManagementClient({
      domain: configService.get('auth0.domain'),
      clientId: configService.get('auth0.clientId'),
      clientSecret: configService.get('auth0.clientSecret'),
    });

    this.authClient = new AuthenticationClient({
      domain: configService.get('auth0.domain'),
      clientId: configService.get('auth0.clientId'),
    });
  }

  async validateToken(token: string): Promise<Auth0User> {
    try {
      // Usamos el método userInfo que es el correcto según la documentación de Auth0
      const userInfo = await this.authClient.userInfo(token);
      return userInfo as Auth0User;
      
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserProfile(userId: string): Promise<any> {
    try {
      // Usamos el método get de users que es el correcto según la documentación
      return await this.managementClient.users.get({ id: userId });
    } catch (error) {
      throw new UnauthorizedException('Unable to retrieve user profile');
    }
  }
}