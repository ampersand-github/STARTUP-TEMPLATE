import { UserId } from 'src/domain/user/user-id/user-id';


export interface IBorrowBookUseCase {
  userId: UserId;
}

export class BorrowBookUseCase {
  public constructor() {}
  public async do(props: IBorrowBookUseCase) {
    // can i borrow book domain service -> boolean
    // bookをリポジトリから呼ぶ
    // book.canBorrow
    // 購入できない場合、エラー
    throw new Error("未実装")
  };
}

/*
export class FindAllUsersUsecase {
  public constructor(private userRepository: IUserRepository) {}

  public async findAll() {
    const allUsers: User[] = await this.userRepository.findAll();
    return allUsers.map((user) => new FindAllUsersDto(user));
  }
}
 */
