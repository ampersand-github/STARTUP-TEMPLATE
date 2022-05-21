import { Controller, Get } from '@nestjs/common';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { findAllBooksDto } from '../../../usecase/book/__dto__/find-all-books-dto';
import { CustomLoggerService } from '../../../__shared__/logger/custom-logger.service';
import { findAllBook } from '../../../usecase/book/find-all-book.test';

@Controller('book')
export class BookController {
  private bookRepository = new BookRepository(this.prismaService);
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get('pass')
  //  curl http://localhost:3001/book
  public async pass() {
    return 'passed!';
  }

  @Get()
  //  curl http://localhost:3001/book
  public async getHello() {
    const allBooks = await findAllBook(this.bookRepository);
    return findAllBooksDto(allBooks);
  }
}
