import {Controller, Get, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { BookRepository } from 'src/infrastructure/repository/book/book-repository';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CustomLoggerService } from '../../../__shared__/logger/custom-logger.service';
import {OpenBookOAQS} from "../../../infrastructure/query-service/open-book-over-aggregation-query-service";
import {findAllBookUC} from "../../../usecase/open-book-over-aggregation/find-all-book-usecase";

@Controller('book')
export class BookController {
  private openBookOAQS = new OpenBookOAQS(this.prismaService)
  private
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get()
  public async index() {
    try {
    return await findAllBookUC({openBookOAQS:this.openBookOAQS})
  } catch (error) {
    Logger.error(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  }

  @Get('pass')
  //  curl http://localhost:3001/book
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
