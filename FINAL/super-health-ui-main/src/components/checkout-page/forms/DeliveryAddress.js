import React from 'react';
import FormItem from '../../form/FormItem';
import StateDropDown from '../../form/StateDropdown';
import styles from './DeliveryAddress.module.css';
import constants from '../../../utils/constants';

/**
 * @name DeliveryAddress
 * @description Allows entry of delivery address
 * @return component
 */
const DeliveryAddress = ({ onChange, deliveryData, errors }) => {
  const usStates = [...constants.STATES_ARRAY];

  return (
    <div className={styles.deliveryAddress}>

      <FormItem
        type="text"
        id="firstName"
        label="First Name"
        onChange={onChange}
        value={deliveryData.firstName}
        errorMessage={errors.firstName && <span className={styles.span}>{errors.firstName}</span>}
      />

      <FormItem
        type="text"
        id="Mi"
        label="MI"
        onChange={onChange}
        value={deliveryData.Mi}
        errorMessage={
          errors.Mi && <span className={styles.span}>{errors.Mi}</span>
        }
      />
      <FormItem
        type="text"
        id="lastName"
        label="Last Name"
        onChange={onChange}
        value={deliveryData.lastName}
        errorMessage={errors.lastName && <span className={styles.span}>{errors.lastName}</span>}

      />
      <FormItem
        placeholder="e.g. 123 Sesame Street"
        type="text"
        id="street"
        label="Street"
        onChange={onChange}
        value={deliveryData.street}
        errorMessage={errors.street && <span className={styles.span}>{errors.street}</span>}

      />

      <FormItem
        placeholder="e.g. Unit #1"
        type="text"
        id="street2"
        label="Street 2 (Optional)"
        onChange={onChange}
        value={deliveryData.street2}
        errorMessage={errors.street2 && <span className={styles.span}>{errors.street2}</span>}

      />

      <FormItem
        type="text"
        id="city"
        label="City"
        onChange={onChange}
        value={deliveryData.city}
        errorMessage={errors.city && <span className={styles.span}>{errors.city}</span>}

      />

      <StateDropDown
        id="state"
        label="State"
        onChange={onChange}
        value={deliveryData.state}
        options={usStates}
        errorMessage={errors.state && <span className={styles.span}>{errors.state}</span>}

      />
      <div className={styles.container}>

        <FormItem
          placeholder="e.g. 12345"
          type="text"
          id="zip"
          label="Zip"
          onChange={onChange}
          value={deliveryData.zip}
          errorMessage={errors.zip && <span className={styles.span}>{errors.zip}</span>}

        />
        <div className={styles.dash}>-</div>
        <div className={styles.inputWrap}>
          <FormItem
            placeholder="e.g. 1234"
            type="text"
            id="zip2"
            onChange={onChange}
            value={deliveryData.zip2}
            errorMessage={errors.zip2 && <span className={styles.span}>{errors.zip2}</span>}
          />
        </div>
      </div>
    </div>

  );
};

export default DeliveryAddress;
