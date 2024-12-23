import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios'; 
import { ConfigService } from '@nestjs/config';
import { ManagementClient, AuthenticationClient } from 'auth0';
import { Auth0User } from '../interfaces/auth0-user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class Auth0Service {
  private managementClient: ManagementClient;
  private authClient: AuthenticationClient;

  constructor(private configService: ConfigService, private httpService: HttpService) {
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

  async validateCodeAndGenerateToken(code: string): Promise<any> {
    const domain = this.configService.get('auth0.domain');
    const clientId = this.configService.get('auth0.clientId');
    const clientSecret = this.configService.get('auth0.clientSecret');
    const redirectUri = this.configService.get('auth0.redirectUri');

    // Realizar la solicitud al endpoint de Auth0 para intercambiar el código por un token
    try {
      console.log('Code request:', code);
      console.log('Domain:', domain);
      console.log('Client id:', clientId);
      console.log('Client secret:', clientSecret);
      console.log('Redirect uri:', redirectUri);
      

      const response = await this.httpService.axiosRef.post(
        `https://${domain}/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }
      );
      
      console.log('Token response:', response);

      // Retornar el token al controlador
      return response.data;
    } catch (error) {
      console.log('Error:', error.response.data);
      throw new Error('Error validating code with Auth0: ' + error.message);
    }
  }

  async validateToken(token: string): Promise<Auth0User> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `https://${process.env.AUTH0_DOMAIN}/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      return response.data as Auth0User;
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