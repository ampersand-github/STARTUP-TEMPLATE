import { Controller, Get } from '@nestjs/common';
import { findAllBooks } from 'src/usecase/find-all-books';
import { BookRepository } from 'src/infrastructure/repository/book-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { findAllBooksDto } from './__dto__/find-all-books-dto';
import {CustomLoggerService} from "../../__shared__/logger/custom-logger.service";

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
    const allBooks = await findAllBooks(this.bookRepository);
    return findAllBooksDto(allBooks);
  }
}
