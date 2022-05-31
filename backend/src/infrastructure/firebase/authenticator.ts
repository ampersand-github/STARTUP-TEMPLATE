import * as admin from 'firebase-admin';
import { UnauthorizedException } from '@nestjs/common';

export class Authenticator {
  public async execute(token: string): Promise<string> {
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(token);
      return decodedIdToken.uid;
    } catch {
      throw new UnauthorizedException(`authentication failed`);
    }
  }
}
