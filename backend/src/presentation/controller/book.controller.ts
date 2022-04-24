import { Controller, Get } from '@nestjs/common';
import { findAllBooks } from 'src/usecase/find-all-books';
import { BookRepository } from 'src/infrastructure/repository/book-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { findAllBooksDto } from './__dto__/find-all-books-dto';

@Controller('book')
export class BookController {
  private prisma = new PrismaService();
  private bookRepository = new BookRepository(this.prisma);

  @Get()
  //  curl http://localhost:3005/book
  public async getHello() {
    const allBooks = await findAllBooks(this.bookRepository);
    return findAllBooksDto(allBooks);
  }
}
