import * as React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';

const cardOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#1a1a1a',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      lineHeight: '1.4',
      fontSize: '16px',
      '::placeholder': {
        color: '#999',
      },
    },
  },
};

interface IPaymentForm {
  clientSecret: string;
}

/**
 * CheckoutForm
 */
export const PaymentForm = (props: IPaymentForm): JSX.Element => {
  const price = 1000;
  const [succeeded, setSucceeded] = React.useState(false);
  const [error, setError] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [clientSecret, setClientSecret] = React.useState('');
  // react hookを利用したstripeへのアクセス
  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    setClientSecret(props.clientSecret);
  }, []);

  // 入力時のチェック
  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message.toString : '');
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    const cardElement = elements!.getElement(CardElement);
    ev.preventDefault();
    console.log('saaa');
    console.log(props.clientSecret);
    setProcessing(true);
    const payload = await stripe!.confirmCardPayment(props.clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });
    console.log('----fs-fsdfsf');
    console.log(payload);
    if (payload.error) {
      //  setError(`Payment failed ${payload.error.message.toString()}`);
      setProcessing(false);
    } else {
      setError('');
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="my-2">&yen;{price} の支払い</div>
      {/* 成功時の表示　*/}
      {succeeded ? (
        <p>
          <span>支払いが完了しました。</span>
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dashboard.
          </a>
          <span>で確認しましょう。</span>
        </p>
      ) : (
        <div>
          {/* CartElementはiframeを利用したクレジットカード入力フォームを提供する */}
          <div className="border border-gray-300 p-4 rounded">
            <CardElement onChange={handleChange} options={cardOptions} />
          </div>
          <button
            className="rounded bg-blue-500 text-white px-4 py-2 mt-2"
            disabled={processing || disabled || succeeded}
            id="submit"
          >
            <span>{processing ? 'sending...' : 'Pay now'}</span>
          </button>
          {/* エラーの表示 */}
          {error && <div role="alert">{error}</div>}
        </div>
      )}
    </form>
  );
};
