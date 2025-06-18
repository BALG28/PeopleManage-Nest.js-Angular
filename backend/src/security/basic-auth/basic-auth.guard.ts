import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header no encontrado');
    }

    const authParts = authHeader.split(' ');
    if (authParts[0] !== 'Basic' || authParts.length !== 2) {
      throw new UnauthorizedException('Formato de autenticación inválido. Se esperaba "Basic <token>"');
    }

    const token = authParts[1];
    let decoded: string;

    try {
      decoded = Buffer.from(token, 'base64').toString('utf8');
    } catch (error) {
      throw new UnauthorizedException('Token Base64 inválido');
    }

    const credentials = decoded.split(':');
    const username = credentials[0];
    const password = credentials[1];


    const isValid = username === 'admin' && password === 'ApiSecret123';

    if (isValid) {
      return true; 
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}