import { toast } from 'react-toastify';
import makePurchase from './CheckoutService';

describe('makePurchase', () => {
  it('makes a purchase', () => {
    makePurchase(true);

    expect(toast.success);
  });

  it('declines the purchase', () => {
    makePurchase(false);

    expect(toast.error);
  });
});
