import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, name, label, placeholder, type, step, errorMessage, max, min, testId
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div div className={styles.container}>
        <input
          className={errorMessage ? styles.errorInput : styles.input}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          step={step}
          max={max}
          min={min}
          data-testid={testId}
        />
        <div className={styles.errorBox}>{errorMessage}</div>
      </div>
    </label>
  </div>
);

export default FormItem;
