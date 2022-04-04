import { IEmailQueryService } from 'src/domain/user/__interface__/email-query-service-interface';
import { PrismaService } from '../prisma/prisma.service';

export class EmailQueryService implements IEmailQueryService {
  private readonly prisma: PrismaService;

  constructor(private _prisma: PrismaService) {
    this.prisma = _prisma;
  }

  public async matchEmail(email: string): Promise<boolean> {
    // todo リポジトリから全件とってきていい
    const result = await this.prisma.users.findMany({
      where: { email: email },
    });
    // 合致0件 -> false, 合致あればtrue
    return result.length !== 0;
  }
}
