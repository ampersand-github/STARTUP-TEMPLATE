import { BookRepository } from '../infrastructure/repository/book/book-repository';
import { Book } from '../domain/book/book';

export const findAllBooks = async (
  bookRepository: BookRepository,
): Promise<Book[]> => {
  return await bookRepository.findAll();
};
