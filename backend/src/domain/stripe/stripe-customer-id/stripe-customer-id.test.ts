import { StripeCustomerId } from './stripe-customer-id';

describe('BorrowId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(StripeCustomerId.create()).toEqual(expect.any(StripeCustomerId));
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(StripeCustomerId.reBuild('test-id')).toEqual(
        expect.any(StripeCustomerId),
      );
    });
  });
});
