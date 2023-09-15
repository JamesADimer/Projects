import React from 'react';
import moment from 'moment';
import FormItem from '../../form/FormItem';
import StateDropDown from '../../form/StateDropdown';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';
import constants from '../../../utils/constants';
import PhoneFormItem from '../../form/PhoneFormItem';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({
  onChange, billingData, useShippingForBilling, errors
}) => {
  const usStates = [...constants.STATES_ARRAY];
  const eNow = new Date();
  const eMoment = moment(eNow);
  const month = ['MM', eMoment.format('MM'), eMoment.clone().add(1, 'months').format('MM'), eMoment.clone().add(2, 'months').format('MM'), eMoment.clone().add(3, 'months').format('MM'), eMoment.clone().add(4, 'months').format('MM'), eMoment.clone().add(5, 'months').format('MM'), eMoment.clone().add(6, 'months').format('MM'), eMoment.clone().add(7, 'months').format('MM'), eMoment.clone().add(8, 'months').format('MM'), eMoment.clone().add(9, 'months').format('MM'), eMoment.clone().add(10, 'months').format('MM'), eMoment.clone().add(11, 'months').format('MM')];
  const formatedYear = eMoment.format('YY');
  const year = ['YY', formatedYear, eMoment.clone().add(1, 'years').format('YY'), eMoment.clone().add(2, 'years').format('YY'),
    eMoment.clone().add(3, 'years').format('YY'), eMoment.clone().add(4, 'years').format('YY'), eMoment.clone().add(5, 'years').format('YY')];

  return (

    <div className={styles.deliveryAddress}>
      {!useShippingForBilling && (
        <>

          <FormItem
            placeholder="e.g. 123 Sesame Street"
            type="text"
            id="billingStreet"
            label="Street"
            onChange={onChange}
            value={billingData.billingStreet}
            errorMessage={
              errors.billingStreet && <span className={styles.span}>{errors.billingStreet}</span>
            }
          />

          <FormItem
            placeholder="e.g. Unit #1"
            type="text"
            id="billingStreet2"
            label="Street 2 (Optional)"
            onChange={onChange}
            value={billingData.billingStreet2}
            errorMessage={
              errors.billingStreet2 && <span className={styles.span}>{errors.billingStreet2}</span>
            }
          />

          <FormItem
            type="text"
            id="billingCity"
            label="City"
            onChange={onChange}
            value={billingData.billingCity}
            errorMessage={
              errors.billingCity && <span className={styles.span}>{errors.billingCity}</span>
            }
          />

          <StateDropDown
            id="billingState"
            label="State"
            onChange={onChange}
            value={billingData.billingState}
            options={usStates}
            errorMessage={
              errors.billingState && <span className={styles.span}>{errors.billingState}</span>
            }
          />

          <div className={styles.container}>

            <FormItem
              placeholder="e.g. 12345"
              type="text"
              id="billingZip"
              label="Zip"
              onChange={onChange}
              value={billingData.billingZip}
              errorMessage={
                errors.billingZip && <span className={styles.span}>{errors.billingZip}</span>
              }

            />
            <div className={styles.dash}>-</div>
            <div className={styles.inputWrap}>
              <FormItem
                placeholder="e.g. 1234"
                type="text"
                id="billingZip2"
                onChange={onChange}
                value={billingData.billingZip2}
                errorMessage={
                  errors.billingZip2 && <span className={styles.span}>{errors.billingZip2}</span>
                }
              />
            </div>
          </div>
        </>
      )}
      <FormItem
        placeholder="e.g. example@catalyte.io"
        type="email"
        id="email"
        label="Email"
        onChange={onChange}
        value={billingData.email}
        errorMessage={errors.email && <span className={styles.span}>{errors.email}</span>}
      />

      <PhoneFormItem
        value={billingData.phoneA}
        value2={billingData.phoneB}
        value3={billingData.phoneC}
        onChange={onChange}
        label="Phone"
        errorMessage={errors.phoneA && (
        <span className={styles.span}>{errors.phoneA}</span>
        )}
      />

      <FormItem
        placeholder="e.g. 1234567812345678"
        type="text"
        id="creditCard"
        label="Credit Card"
        onChange={onChange}
        value={billingData.creditCard}
        errorMessage={errors.creditCard && <span className={styles.span}>{errors.creditCard}</span>}
      />

      <FormItem
        placeholder="e.g. 555"
        type="text"
        id="cvv"
        label="CVV"
        onChange={onChange}
        value={billingData.cvv}
        errorMessage={errors.cvv && <span className={styles.span}>{errors.cvv}</span>}
      />
      <div className={styles.container}>

        <FormItemDropdown
          id="expirationM"
          label="Expiration"
          onChange={onChange}
          value={billingData.expirationM}
          options={month}
          errorMessage={
            errors.expirationM && <span className={styles.span}>{errors.expirationM}</span>
          }

        />
        <div className={styles.dash}>/</div>

        <div className={styles.inputWrap}>
          <FormItemDropdown
            id="expirationY"
            onChange={onChange}
            value={billingData.expirationY}
            options={year}
            errorMessage={
              errors.expirationY && <span className={styles.span}>{errors.expirationY}</span>
            }

          />
        </div>
      </div>

      <FormItem
        type="text"
        id="cardholder"
        label="Cardholder Name"
        onChange={onChange}
        value={billingData.cardholder}
        errorMessage={errors.cardholder && <span className={styles.span}>{errors.cardholder}</span>}
      />
    </div>

  );
};

export default BillingDetails;
