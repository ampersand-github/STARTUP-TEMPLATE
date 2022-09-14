import { Stripe } from 'stripe';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { UserId } from 'src/domain/user/user-id/user-id';
import { createStripeCustomer } from './create-stripe-customer';
import { syncEmailToStripeCustomer } from './sync-email-to-stripe-customer';

export interface IFindAndSyncOrCreateStripeCustomerId {
  userId: UserId;
  email: string;
  stripe: Stripe;
  userR: IUserRepository;
}

export const findAndSyncOrCreateStripeCustomerId = async (
  props: IFindAndSyncOrCreateStripeCustomerId,
): Promise<string> => {
  // todo あとでつくる
  const user = props.userR.findOne(props.userId);

  // stripeCustomerを習得
  // const stripeId = user.stripeId
  const stripeCustomerId = 'cus_Lde2sYXXDC4b5x';

  // メールアドレスを同期
  if (stripeCustomerId) {
    await syncEmailToStripeCustomer({
      stripeCustomerId: stripeCustomerId,
      email: props.email,
      stripe: props.stripe,
    });
    return stripeCustomerId;
  } else {
    return await createStripeCustomer({
      userId: UserId.create(),
      email: props.email,
      stripe: props.stripe,
    });
  }
};
