import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { truncateAllTable } from "src/infrastructure/__shared__/truncate-all-table";
import {BorrowRepository} from "./borrow-repository";


describe('BorrowRepository', () => {
  const prismaService = new PrismaService();
  const bookRepository = new BorrowRepository(prismaService);

  beforeEach(async () => {
    await truncateAllTable(prismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('', () => {
    test('', async () => {
    });
  });
});
