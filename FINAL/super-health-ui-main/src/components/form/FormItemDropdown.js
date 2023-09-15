import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options, errorMessage, testId
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div div className={styles.container}>
        <select
          className={errorMessage ? styles.errorInput : styles.input}
          id={id}
          onChange={onChange}
          onBlur={onChange}
          value={value}
          data-testid={testId}
        >
          {options.map((optionText) => (
            <option
              value={optionText}
              key={optionText}
            >
              {optionText}
            </option>
          ))}
        </select>
        <div className={styles.errorBox}>{errorMessage}</div>
      </div>
    </label>

  </div>
);

export default FormItemDropdown;
