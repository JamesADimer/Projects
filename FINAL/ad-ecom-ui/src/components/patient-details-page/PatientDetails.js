import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './PatientDetails.module.css';
import PatientEncounters from './PatientEncounters';
import { deletePatient, fetchPatient } from './PatientDetailsService';
import constants from '../../utils/constants';

/**
 * @name PatientDetails
 * @description Displays the patient details page
 * @return component
 */
const PatientDetails = () => {
  const { patientId } = useParams();
  const history = useHistory();
  const [patient, setPatient] = useState({});
  const [apiError, setApiError] = useState(false);

  const onDelete = () => {
    deletePatient(patientId, history);
  };

  useEffect(() => {
    fetchPatient(patientId, setPatient, setApiError);
    if (sessionStorage.getItem('patientUpdated') === 'true') {
      toast.success('Patient has been successfully updated.', {
        position: 'top-center',
        autoClose: 8000
      });
      sessionStorage.clear();
    }
    if (sessionStorage.getItem('encounterUpdated') === 'true') {
      toast.success('Encounter has been successfully updated.', {
        position: 'top-center',
        autoClose: 8000
      });
      sessionStorage.clear();
    }
  }, [patientId]);

  return (
    <div className={styles.page}>
      <button
        type="submit"
        className={styles.btnView}
        style={{ backgroundColor: '#666666', marginLeft: '30%', width: '150px' }}
        onClick={() => {
          history.push({
            pathname: '/patients'
          });
        }}
      >
        {'< Back'}
      </button>
      {!apiError ? (
        <div className={styles.container}>
          <div className={styles.userContainer}>
            <div className={styles.leftColumn}>
              <button
                type="submit"
                className={styles.btnView}
                style={{ backgroundColor: 'green', width: '150px' }}
                onClick={() => {
                  history.push({
                    pathname: `/patients/${patient.id}/edit`
                  });
                }}
                aria-label="edit patient"
              >
                Edit
              </button>
            </div>
            <div className={styles.rightColumn}>
              <button
                type="submit"
                id={patient.name}
                className={styles.btnView}
                style={{ backgroundColor: 'red', margin: '0 0 0 30%', width: '150px' }}
                onClick={() => {
                  onDelete();
                }}
              >
                Delete
              </button>
            </div>
            <div className={styles.title}>
              Patient Details
              <hr />
            </div>
            <div className={styles.leftColumn}>
              ID Number:
            </div>
            <div className={styles.rightColumn} data-testid="patientId">
              {patient.id}
            </div>
            <div className={styles.leftColumn}>
              First Name:
            </div>
            <div className={styles.rightColumn} data-testid="firstname">
              {patient.first_name}
            </div>
            <div className={styles.leftColumn}>
              Last Name:
            </div>
            <div className={styles.rightColumn} data-testid="lastname">
              {patient.last_name}
            </div>
            <div className={styles.leftColumn}>
              SSN:
            </div>
            <div className={styles.rightColumn} data-testid="ssn">
              {patient.ssn}
            </div>
            <div className={styles.leftColumn}>
              Email:
            </div>
            <div className={styles.rightColumn} data-testid="email">
              {patient.email}
            </div>
            <div className={styles.leftColumn}>
              Age:
            </div>
            <div className={styles.rightColumn} data-testid="age">
              {patient.age}
            </div>
            <div className={styles.leftColumn}>
              Height:
            </div>
            <div className={styles.rightColumn} data-testid="height">
              {`${patient.height} inches`}
            </div>
            <div className={styles.leftColumn}>
              Weight:
            </div>
            <div className={styles.rightColumn} data-testid="weight">
              {`${patient.weight} lbs`}
            </div>
            <div className={styles.leftColumn}>
              Insurance:
            </div>
            <div className={styles.rightColumn} data-testid="insurance">
              {patient.insurance}
            </div>
            <div className={styles.leftColumn}>
              Gender:
            </div>
            <div className={styles.rightColumn} data-testid="gender">
              {patient.gender}
            </div>
            <div className={styles.leftColumn}>
              Street:
            </div>
            <div className={styles.rightColumn} data-testid="street">
              {patient.street}
            </div>
            <div className={styles.leftColumn}>
              City:
            </div>
            <div className={styles.rightColumn} data-testid="city">
              {patient.city}
            </div>
            <div className={styles.leftColumn}>
              State:
            </div>
            <div className={styles.rightColumn} data-testid="state">
              {patient.state}
            </div>
            <div className={styles.leftColumn}>
              Postal Code:
            </div>
            <div className={styles.rightColumn} data-testid="postal">
              {patient.postal}
            </div>
            <div className={styles.title}>
              <hr />
              Encounters
              <hr />
            </div>
            <div className={styles.encountersArea} data-testid="encounters">
              <PatientEncounters />
            </div>
          </div>
        </div>
      ) : (<p data-testid="errMsg">{constants.API_ERROR}</p>)}
    </div>
  );
};
export default PatientDetails;
