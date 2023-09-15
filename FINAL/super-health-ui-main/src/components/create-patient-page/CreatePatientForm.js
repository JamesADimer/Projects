import React from 'react';
import FormItem from '../form/FormItem';
import StateDropDown from '../form/StateDropdown';
import styles from './CreatePatient.module.css';

const CreatePatientForm = ({
  onFormChange, formData, errors, stateOptions
}) => (
  <div className={styles.createPatient}>
    <div className={styles.center} data-testid="formItems">
      <FormItem
        type="text"
        id="firstName"
        label="First Name"
        onChange={onFormChange}
        value={formData.firstName}
        errorMessage={errors.firstName && <span className={styles.span}>{errors.firstName}</span>}
      />
      <FormItem
        type="text"
        id="lastName"
        label="Last Name"
        onChange={onFormChange}
        value={formData.lastName}
        errorMessage={errors.lastName
          && <span className={styles.span}>{errors.lastName}</span>}
      />
      <FormItem
        type="text"
        id="ssn"
        label="Social Security Number"
        onChange={onFormChange}
        value={formData.ssn}
        errorMessage={
          errors.ssn
          && <span className={styles.span}>{errors.ssn}</span>
        }
      />
      <FormItem
        type="text"
        id="email"
        label="Email"
        onChange={onFormChange}
        value={formData.email}
        errorMessage={errors.email
          && <span className={styles.span}>{errors.email}</span>}
      />
      <FormItem
        type="text"
        id="age"
        label="Age"
        onChange={onFormChange}
        value={formData.age}
        errorMessage={errors.age
          && <span className={styles.span}>{errors.age}</span>}
      />
      <FormItem
        type="text"
        id="height"
        label="Height"
        onChange={onFormChange}
        value={formData.height}
        errorMessage={errors.height && <span className={styles.span}>{errors.height}</span>}
      />
      <FormItem
        type="text"
        id="weight"
        label="Weight"
        onChange={onFormChange}
        value={formData.weight}
        errorMessage={errors.weight
          && <span className={styles.span}>{errors.weight}</span>}
      />
      <FormItem
        type="text"
        id="insurance"
        label="Insurance"
        onChange={onFormChange}
        value={formData.insurance}
        errorMessage={
          errors.insurance
          && <span className={styles.span}>{errors.insurance}</span>
        }
      />
      <FormItem
        type="text"
        id="gender"
        label="Gender"
        onChange={onFormChange}
        value={formData.gender}
        errorMessage={errors.gender
          && <span className={styles.span}>{errors.gender}</span>}
      />
      <FormItem
        type="text"
        id="street"
        label="Street"
        onChange={onFormChange}
        value={formData.street}
        errorMessage={errors.street
          && <span className={styles.span}>{errors.street}</span>}
      />
      <FormItem
        type="text"
        id="city"
        label="City"
        onChange={onFormChange}
        value={formData.city}
        errorMessage={
          errors.city
          && <span className={styles.span}>{errors.city}</span>
        }
      />
      <StateDropDown
        type="text"
        id="state"
        label="State"
        onChange={onFormChange}
        value={formData.state}
        options={stateOptions}
        errorMessage={errors.state
          && <span className={styles.span}>{errors.state}</span>}
      />
      <FormItem
        type="text"
        id="postal"
        label="Postal"
        onChange={onFormChange}
        value={formData.postal}
        errorMessage={errors.postal
          && <span className={styles.span}>{errors.postal}</span>}
      />
    </div>
  </div>
);

export default CreatePatientForm;
