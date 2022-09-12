import {  User } from "../user";
import { UserId } from "../user-id/user-id";
import { StripeCustomerId } from "../stripe-customer-id/stripe-customer-id";
import { createTestUser } from "./create-test-user";


describe("createTestUser", () => {

  it("デフォルト値の場合", () => {
    const user = createTestUser();
    expect(user).toStrictEqual(expect.any(User));
  });

  it("すべての値を設定する場合", () => {
    const userId = UserId.reConstruct("dummy-uuid")
    const stripeCustomerId = StripeCustomerId.construct();
      const name = '田中太郎';
      const tel = '09011112222';

    const user = createTestUser(userId, stripeCustomerId,name,tel)
    expect(user.id).toStrictEqual(userId);
    expect(user.stripeCustomerId).toStrictEqual(stripeCustomerId);
    expect(user.name).toStrictEqual(name);
    expect(user.tel).toStrictEqual(tel);
  });

  it("一部の値を設定する場合", () => {
    const stripeCustomerId = StripeCustomerId.construct();
    const name = '田中太郎';
    const user = createTestUser(
      undefined,
      stripeCustomerId,
      name,
      undefined
  );
    expect(user.id).toStrictEqual(expect.any(UserId));
    expect(user.stripeCustomerId).toStrictEqual(stripeCustomerId);
    expect(user.name).toStrictEqual(name);
    expect(user.tel).not.toStrictEqual(undefined);
  });
});
