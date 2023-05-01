import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name StateDropDown
 * @description Input field
 * @return component
 */
const StateDropDown = ({
  onChange, value, id, label, options, errorMessage
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
        >
          {options.map((option) => (
            <option
              value={option.value}
              key={option.value}
            >
              {option.state}
            </option>
          ))}
        </select>
        <div className={styles.errorBox}>{errorMessage}</div>
      </div>
    </label>

  </div>
);

export default StateDropDown;
