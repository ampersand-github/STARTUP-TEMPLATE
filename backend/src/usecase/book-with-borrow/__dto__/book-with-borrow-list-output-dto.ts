export interface IBookWithBorrowListOutputDto {
  name: string;
  author: string;
  tagList: string[];
  isBorrowing: boolean;
}

export class BookWithBorrowListOutputDto {
  public readonly name: string;
  public readonly author: string;
  public readonly tagList: string[];
  public readonly isBorrowing: boolean;

  public constructor(props: IBookWithBorrowListOutputDto) {
    this.name = props.name;
    this.author = props.author;
    this.tagList = props.tagList;
    this.isBorrowing = props.isBorrowing;
  }
}
