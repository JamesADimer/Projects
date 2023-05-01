import React from 'react';
import styles from './FormItem.module.css';

/**
 *
 * @param {props} string: label, name, id, value, function: onChange, defaultChecked
 * @returns component
 */
const FormItemRadio = ({
  label, name, id, onChange, value, defaultChecked
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      {' '}
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
    </label>

  </div>
);

export default FormItemRadio;
