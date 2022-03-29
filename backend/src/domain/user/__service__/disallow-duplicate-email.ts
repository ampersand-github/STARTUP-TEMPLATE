import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IEmailQueryService } from '../__interface__/email-query-service-interface';

export const DisallowDuplicateEmail = async (
  prisma: PrismaService,
  emailQueryService: IEmailQueryService,
  email: string,
): Promise<void> => {
  const result: boolean = await emailQueryService.matchEmail(email);
  if (result === true) {
    throw new Error('このメールアドレスは既に使用されています');
  }
};
