import { ValueObject } from 'src/domain/__shared__/value-object';
import { Reservation } from './reservation';
import { UserId } from '../../user/user-id/user-id';

export interface IReservationList {
  values: Reservation[];
}

export class ReservationList extends ValueObject<IReservationList> {
  public readonly values: IReservationList['values'];

  public constructor(props: IReservationList) {
    super(props);
    // todo 予約日順にソートする
    this.values = props.values;
  }

  add(reservation: Reservation): ReservationList {
    // 一人で同じ作品を2つ予約はできない
    throw new Error('未実装');
  }

  remove(reservation: Reservation): ReservationList {
    // 一人で同じ作品を2つ予約はできない
    throw new Error('未実装');
  }

  getReservationRank(userId: UserId): number {
    throw new Error('未実装');
  }
}
