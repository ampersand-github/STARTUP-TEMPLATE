import { OpenBookId } from '../open-book-id/open-book-id';
import { OpenBook } from '../open-book';

export interface IOpenBookRepository {
  findOne(id: OpenBookId): Promise<OpenBook | null>;
  save(entity: OpenBook): Promise<void>;
}
