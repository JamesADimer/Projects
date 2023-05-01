import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import styles from '../create-patient-page/CreatePatientContainer.module.css';
import CreatePatientForm from '../create-patient-page/CreatePatientForm';
import { fetchPatient } from '../patient-details-page/PatientDetailsService';
import updatePatient from './EditPatientService';
import validate from '../create-patient-page/CreatePatientValidation';
import constants from '../../utils/constants';

/**
 * @name Edit Patient
 * @description A view that contains details needed to process editing an patient
 * @return component
 */
const EditPatientPage = () => {
  const history = useHistory();
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});
  const [apiError, setApiError] = useState(false);
  const [errorsText, setErrorsText] = useState({});
  const errors = useRef(0);
  const onFormChange = (e) => {
    setPatient({ ...patient, [e.target.id]: e.target.value });
  };
  const usStates = [...constants.STATES_ARRAY];

  /**
   * Handle Submit
   * @param {e} submit event
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    errors.current = (validate(patient));
    setErrorsText(errors.current);
    const newPatient = {
      id: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      ssn: patient.ssn,
      email: patient.email,
      age: patient.age,
      height: patient.height,
      weight: patient.weight,
      insurance: patient.insurance,
      gender: patient.gender,
      street: patient.street,
      city: patient.city,
      state: patient.state,
      postal: patient.postal
    };
    if (Object.keys(errors.current).length === 0) {
      setPatient({
        id: patient.id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        ssn: patient.ssn,
        email: patient.email,
        age: patient.age,
        height: patient.height,
        weight: patient.weight,
        insurance: patient.insurance,
        gender: patient.gender,
        street: patient.street,
        city: patient.city,
        state: patient.state,
        postal: patient.postal
      });
      return updatePatient(patientId, newPatient, history);
    }
    toast.error('Invalid entry. Please check form for errors.', {
      position: 'top-center',
      autoClose: 8000
    });
    return false;
  };

  useEffect(() => {
    fetchPatient(patientId, setPatient, setApiError);
  }, [patientId]);

  return (
    <div className={styles.pageContainer}>
      {!apiError ? (
        <Grid justify="center" container className={styles.checkoutContainer}>
          <form onSubmit={handleSubmit} className={styles.step}>
            <h3 className={styles.title}>Edit Patient</h3>
            <Grid item data-testid="form">
              <CreatePatientForm
                onFormChange={onFormChange}
                formData={patient}
                errors={errorsText}
                stateOptions={usStates}
              />
              <Grid container id="submitButton" justify="center">
                <input className={`${styles.summary}  ${styles.payButton}`} type="submit" value="Edit Patient" />
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : (apiError)}
    </div>
  );
};

export default EditPatientPage;
