import { ValueObject } from '../../__shared__/value-object';

export interface ILatestBorrow {
  startAt: Date;
  endAt: Date | undefined;
}

export class LatestBorrow extends ValueObject<ILatestBorrow> {
  private readonly startAt: Date;
  private readonly endAt: Date | undefined;

  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // このドメインオブジェクトは利用者集約に属するテーブルから習得している。
  // そのため書籍集約から更新がかけられないようにgetterは公開しない
  // - - - - - - - - - - - - - - - - - - - - - - - - -

  public constructor(props: ILatestBorrow) {
    super(props);
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  public canBorrow(): boolean {
    // this.endAt ? false:true と同じ
    return !this.endAt;
  }
}
