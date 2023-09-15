import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import styles from './CheckoutPage.module.css';
import { useCart } from './CartContext';
import validate from './ValidateCheckoutPageInputs';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const [checked, setChecked] = useState(false);
  const [errorsText, setErrorsText] = useState({});
  const [billingData, setBillingData] = useState({
    billingStreet: '',
    billingStreet2: '',
    billingCity: '',
    billingZip: '',
    billingZip2: '',
    email: '',
    phoneA: '',
    phoneB: '',
    phoneC: '',
    creditCard: '',
    cvv: '',
    cardholder: ''
  });
  const [deliveryData, setDeliveryData] = useState({
    firstName: '',
    lastName: '',
    Mi: '',
    street: '',
    street2: '',
    city: '',
    zip: '',
    zip2: ''
  });
  const history = useHistory();
  const {
    state: { products }
  } = useCart();

  /**
   * @name onBillingChange
   * @description Add event listener to billing data inputs
   * @return input values
   */
  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  /**
   * @name onDeliveryChange
   * @description Add event listener to delivery data inputs
   * @return input values
   */
  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  /**
     * @name handleCheck
     * @description handles checkbox for same billing address
     */

  const handleCheck = () => {
    setChecked(!checked);
  };

  /**
   * @name handlePay handles payment at checkout page
   * @param lineItems the products being bought
   * @param billingAddress the customers billing address
   * @param deliveryAddress customers address to be delivered to
   * @param creditCard the validated CC #
   * @returns the charged purchase with a confimation order and toast
   */
  const handlePay = () => {
    setErrorsText({});

    const errors = validate(deliveryData, billingData, checked);

    if (Object.keys(errors).length === 0) {
      const lineItems = products.map(({ id, quantity }) => ({ productId: id, quantity }));
      const deliveryAddress = {
        deliveryFirstName: deliveryData.Mi ? `${deliveryData.firstName} ${deliveryData.Mi}` : deliveryData.firstName,
        deliveryLastName: deliveryData.lastName,
        deliveryStreet: deliveryData.street,
        deliveryStreet2: deliveryData.street2,
        deliveryCity: deliveryData.city,
        deliveryState: deliveryData.state,
        deliveryZip: deliveryData.zip2 ? `${deliveryData.zip}-${deliveryData.zip2}` : `${deliveryData.zip}`
      };
      const billingAddress = {};
      if (checked) {
        billingAddress.billingStreet = deliveryAddress.deliveryStreet;
        billingAddress.billingStreet2 = deliveryAddress.deliveryStreet2;
        billingAddress.billingCity = deliveryAddress.deliveryCity;
        billingAddress.billingState = deliveryAddress.deliveryState;
        billingAddress.billingZip = deliveryAddress.deliveryZip;
      } else {
        billingAddress.billingStreet = billingData.billingStreet;
        billingAddress.billingStreet2 = billingData.billingStreet2;
        billingAddress.billingCity = billingData.billingCity;
        billingAddress.billingState = billingData.billingState;
        billingAddress.billingZip = billingData.zip2 ? `${billingData.billingZip}-${billingData.billingZip2}` : `${billingData.billingZip}`;
      }
      billingAddress.email = billingData.email;
      billingAddress.phone = `${billingData.phoneA}-${billingData.phoneB}-${billingData.phoneC}`;

      const creditCard = {
        cardNumber: billingData.creditCard,
        cvv: billingData.cvv,
        expiration: `${billingData.expirationM}/${billingData.expirationY}`,
        cardHolder: billingData.cardholder
      };

      const newPurchasePost = {
        billingAddress,
        creditCard,
        deliveryAddress,
        lineItems
      };
      makePurchase(newPurchasePost, history);
    } else {
      setErrorsText(errors);

      toast.error('Invalid entry. You have not been charged. Please check form for details.', {
        position: 'top-center',
        autoClose: 8000
      });
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={`${styles.step} ${styles.order}`}>
        <h3 className={styles.title}>1. Review Order</h3>
        <ReviewOrderWidget />
      </div>
      <div className={`${styles.step} ${styles.delivery}`}>
        <h3 className={styles.title}>2. Delivery Address</h3>
        <DeliveryAddress
          onChange={onDeliveryChange}
          deliveryData={deliveryData}
          errors={errorsText}
        />
        <label htmlFor="useSame" className={styles.sameAddressText}>
          <div className={styles.useSameAddress}>
            <input
              id="useSame"
              onChange={handleCheck}
              type="checkbox"
              value={checked}
            />
          </div>
          Same Billing Address
        </label>
      </div>
      <div className={`${styles.step} ${styles.payment}`}>
        <h3 className={styles.title}>3. Billing Details</h3>
        <BillingDetails
          onChange={onBillingChange}
          billingData={billingData}
          useShippingForBilling={checked}
          errors={errorsText}

        />
      </div>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="button" className={styles.payButton}>
          Checkout
        </button>
      </div>
      <div />
    </div>
  );
};

export default CheckoutPage;
