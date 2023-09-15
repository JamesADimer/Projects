import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const PhoneFormItem = ({
  onChange, value, value2, value3, id, label, errorMessage
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div className={styles.container}>
        <div className={styles.phoneContainer}>
          <div className={styles.phoneA}>
            <input
              className={errorMessage ? styles.errorInput : styles.input}
              placeholder="e.g. 555"
              type="text"
              id="phoneA"
              label="Phone"
              onChange={onChange}
              value={value}
            />
          </div>
          <div className={styles.firstPhoneDash}>-</div>
          <div className={styles.phoneBC}>

            <input
              className={errorMessage ? styles.errorInput : styles.input}
              placeholder="e.g. 555"
              type="text"
              id="phoneB"
              onChange={onChange}
              value={value2}
            />
          </div>
          <div className={styles.secondPhoneDash}>-</div>
          <div className={styles.phoneC}>
            <input
              className={errorMessage ? styles.errorInput : styles.input}
              placeholder="e.g. 5555"
              type="text"
              id="phoneC"
              onChange={onChange}
              value={value3}
            />
          </div>
        </div>
        <div className={styles.errorBox}>{errorMessage}</div>
      </div>

    </label>

  </div>
);

export default PhoneFormItem;
