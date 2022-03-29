import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestValidator } from './request-validator';

/*
コントローラー層での使い方
  @Post()
  @UseGuards(AuthGuard) // これを追記するだけ！簡単！
  public post(@Req() req, @Res() res) {
    console.log(req.uid); // AuthGuard内部でuidを使用できるようにしている
  }
 */

type CustomRequest = Request & { uid: string };

@Injectable()
export class AuthGuard implements CanActivate {
  // private authenticator: Authenticator;
  private readonly requestValidator: RequestValidator;

  constructor(
    //  authenticator: Authenticator,
    requestValidator: RequestValidator,
  ) {
    //   this.authenticator = authenticator;
    this.requestValidator = requestValidator;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    this.requestValidator.validateRequest(request);
    this.requestValidator.validateBearer(request.headers.authorization);
    //  const token = AuthGuard.pullOutToken(request);
    // request.uid = await this.authenticator.execute(token);
    return true;
  }

  private static pullOutToken(request: CustomRequest): string {
    const authorization = request.headers.authorization;
    return authorization.split(' ')[1];
  }
}
