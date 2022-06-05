import { Stripe } from 'stripe';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { UserId } from 'src/domain/user/user-id/user-id';

export interface IFindAndSyncOrCreateStripeCustomerId {
  userId: UserId;
  email: string;
  stripe: Stripe;
  userR: IUserRepository;
}

export const findAndSyncOrCreateStripeCustomerId = async (
  props: IFindAndSyncOrCreateStripeCustomerId,
): Promise<string> => {
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// StripeCustomerとメールアドレスを同期する
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export interface ISyncEmailToStripeCustomer {
  stripeCustomerId: string;
  email: string;
  stripe: Stripe;
}

const syncEmailToStripeCustomer = async (props: ISyncEmailToStripeCustomer) => {
  await props.stripe.customers.update(props.stripeCustomerId, {
    email: props.email,
  });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// stripeCustomerを作成する
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export interface ICreateStripeCustomer {
  userId: UserId;
  email: string;
  stripe: Stripe;
}

const createStripeCustomer = async (props: ICreateStripeCustomer) => {
  const newCustomer: Stripe.Customer = await props.stripe.customers.create({
    email: props.email,
    metadata: {
      uuid: props.userId.toString(),
    },
  });
  return newCustomer.id.toString();
};
