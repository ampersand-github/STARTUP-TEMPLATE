import { UserId } from 'src/domain/user/user-id/user-id';
import { StripeCustomerId } from '../stripe-customer-id/stripe-customer-id';

export interface IBorrowRepository {
  findOne(id: UserId): Promise<StripeCustomerId | null>;
  // findManyByUserId(userId: UserId): Promise<Borrow[]>;
  // save(entity: Borrow): Promise<void>;
}
