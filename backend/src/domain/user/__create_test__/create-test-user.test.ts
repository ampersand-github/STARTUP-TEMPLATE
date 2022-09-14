import { User } from '../user';
import { UserId } from '../user-id/user-id';
import { StripeCustomerId } from '../stripe-customer-id/stripe-customer-id';
import { createTestUser } from './create-test-user';

describe('createTestUser', () => {
  it('デフォルト値の場合', () => {
    // given,when:
    const user = createTestUser();
    // then:
    expect(user).toStrictEqual(expect.any(User));
  });

  it('すべての値を設定する場合', () => {
    // given:
    const userId = UserId.reConstruct('dummy-uuid');
    const stripeCustomerId = StripeCustomerId.construct();
    const name = '田中太郎';
    const tel = '09011112222';
    // when:
    const user = createTestUser(userId, stripeCustomerId, name, tel);
    // then:
    expect(user.id).toStrictEqual(userId);
    expect(user.stripeCustomerId).toStrictEqual(stripeCustomerId);
    expect(user.name).toStrictEqual(name);
    expect(user.tel).toStrictEqual(tel);
  });

  it('一部の値を設定する場合', () => {
    // given:
    const stripeCustomerId = StripeCustomerId.construct();
    const name = '田中太郎';
    // when:
    const user = createTestUser(undefined, stripeCustomerId, name, undefined);
    // then:
    expect(user.id).toStrictEqual(expect.any(UserId));
    expect(user.stripeCustomerId).toStrictEqual(stripeCustomerId);
    expect(user.name).toStrictEqual(name);
    expect(user.tel).not.toStrictEqual(undefined);
  });
});
