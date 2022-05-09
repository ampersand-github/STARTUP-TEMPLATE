import { PrismaClient } from '@prisma/client';
import {createBooks} from "./seeds/book";
import {createTags} from "./seeds/tag";

const main = async () => {
  let prisma: PrismaClient;
  try {
    prisma = new PrismaClient();
    console.log('= = = = = seeding start= = = = = ');
    console.log('createBooks');
    await createBooks(prisma);
    console.log('createTags');
    await createTags(prisma);

    console.log('= = = = =  seeding ends = = = = = ');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};

main().catch((e) => console.error(e));
