import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';
import { IOpenBookOA } from './open-book-OA-interface';

export interface IOpenBookOAQS {
  findOne(id: OpenBookId): Promise<IOpenBookOA | null>;
  findMany(ids: OpenBookId[]): Promise<IOpenBookOA[]>;
  findAll(): Promise<IOpenBookOA[]>;
}
