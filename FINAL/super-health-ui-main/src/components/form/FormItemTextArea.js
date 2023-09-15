import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItemTextArea = ({
  onChange, value, id, label, placeholder, type, ref, name, errorMessage
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div className={styles.container}>
        <textarea
          style={{ marginTop: '.5em' }}
          rows={7}
          cols={1}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          type={type}
          value={value}
          name={name}
        />
        <div className={styles.errorBox}>{errorMessage}</div>
      </div>
    </label>
  </div>
);

export default FormItemTextArea;
