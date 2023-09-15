import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} setPurchase items to purchase
 * @param {*} setApiError error if response returned is not 200
 * @returns payment confirmation response
 */

const makePurchase = async (newPurchasePost, history) => {
  HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', newPurchasePost)
    .then((response) => {
      if (response.ok) {
        sessionStorage.setItem('orderPurchased', 'true');
        history.push('/confirmation');
        return true;
      }
      toast.error('Server Error. You have not been charged. Please try again.', {
        position: 'top-center',
        autoClose: 8000
      });
      return false;
    });
};

export default makePurchase;
