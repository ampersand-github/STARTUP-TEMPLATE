import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

export class RequestValidator {
  public validateRequest(request: Request): boolean {
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('authorization header is nothing');
    }
    return true;
  }

  public validateBearer(bearer: string): boolean {
    if (bearer.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('authorization format is [Bearer 〇〇]');
    }
    if (!bearer.split(' ')[1]) {
      throw new UnauthorizedException('there is no token');
    }
    return true;
  }
}
