import { StripeCustomerId } from './stripe-customer-id';

describe('BorrowId', () => {
  describe('create()', () => {
    it('オブジェクトが生成ができる', () => {
      expect(StripeCustomerId.construct()).toEqual(
        expect.any(StripeCustomerId),
      );
    });
  });
  describe('reBuild()', () => {
    it('オブジェクトが再生成ができる', () => {
      expect(StripeCustomerId.reConstruct('test-id')).toEqual(
        expect.any(StripeCustomerId),
      );
    });
  });
});
