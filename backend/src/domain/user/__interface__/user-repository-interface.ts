import { User } from '../user';
import { UserId } from '../user-id';

export interface IUserRepository {
  // サンプルとして一通りのCRUDを用意したが、最初から全部のCRUDを作る必要はない
  // 要件によってresisterとupdateが合体してsaveになることもあるし、論理削除ならdeleteはいらないので。
  findAll(): Promise<User[]>;
  findOne(id: UserId): Promise<User>;
  register(entity: User): Promise<void>; // ユビキタス言語に一致する関数名にする(createはシステム寄りの言葉なので)
  update(entity: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
