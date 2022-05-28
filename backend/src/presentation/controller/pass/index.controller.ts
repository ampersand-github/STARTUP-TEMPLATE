import { Controller, Get } from '@nestjs/common';
import { CustomLoggerService } from '../../../__shared__/logger/custom-logger.service';
import {PrismaService} from "../../../infrastructure/prisma/prisma.service";

@Controller('pass')
export class PassController {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly logger: CustomLoggerService,
    ) {}

    @Get('1')
    //  curl http://localhost:3001/pass/1
    public async pass() {
        return 'passed!';
    }

    /*
      @Get()
    //  curl http://localhost:3001/book
    public async getHello() {
      const allBooks = await findAllBook(this.bookRepository);
      return findAllBooksDto(allBooks);
    }
     */
}
