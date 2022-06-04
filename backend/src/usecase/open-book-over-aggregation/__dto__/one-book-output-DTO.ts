import { IOpenBookOA } from '../__interface__/open-book-OA-interface';
import { Tag } from 'src/domain/book/tag/tag';

export class OneBookOutputDTO {
  public readonly openBookId: string;
  public readonly name: string;
  public readonly author: string;
  public readonly tagList: string[];
  public readonly isBorrowIng: boolean;
  public constructor(props: IOpenBookOA) {
    this.openBookId = props.book.id.toString();
    this.name = props.book.getName();
    this.author = props.book.getAuthor();
    this.tagList = props.book
      .getTagList()
      .getCollection()
      .map((one: Tag) => one.getValue());
    this.isBorrowIng = !!props.borrowing;
  }
}
