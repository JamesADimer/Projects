import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import styles from './CreatePatientContainer.module.css';
import CreatePatientForm from './CreatePatientForm';
import makePatient from './CreatePatientService';
import validate from './CreatePatientValidation';
import constants from '../../utils/constants';

/**
 * @name Create Patient
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CreatePatientPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    insurance: '',
    gender: '',
    street: '',
    city: '',
    state: 'Select state',
    postal: ''
  });
  const [errorsText, setErrorsText] = useState({});
  const errors = useRef(0);
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const usStates = [...constants.STATES_ARRAY];

  /**
   * Handle Submit
   * @param {e} submit event
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    errors.current = (validate(formData));
    setErrorsText(errors.current);
    const newPatient = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      SSN: formData.ssn,
      Email: formData.email,
      Age: formData.age,
      Height: formData.height,
      Weight: formData.weight,
      Insurance: formData.insurance,
      Gender: formData.gender,
      Street: formData.street,
      City: formData.city,
      State: formData.state,
      Postal: formData.postal
    };
    if (Object.keys(errors.current).length === 0) {
      return makePatient(newPatient, history);
    }
    toast.error('Invalid entry. Please check form for errors.', {
      position: 'top-center',
      autoClose: 8000
    });
    return false;
  };

  return (
    <div className={styles.pageContainer}>
      <Grid justify="center" container className={styles.checkoutContainer}>
        <form onSubmit={handleSubmit} className={styles.step}>
          <h3 className={styles.title}>Create Patient</h3>
          <Grid item data-testid="form">
            <CreatePatientForm
              onFormChange={onFormChange}
              formData={formData}
              errors={errorsText}
              stateOptions={usStates}
            />
            <Grid container id="submitButton" justify="center" data-testid="submitBtn">
              <input className={`${styles.summary}  ${styles.payButton}`} data-testid="submit" type="submit" value="Create Patient" />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default CreatePatientPage;
