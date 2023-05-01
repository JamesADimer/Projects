import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PatientsTable from './PatientsTable';
import styles from './PatientsTable.module.css';
import Constants from '../../utils/constants';
import fetchPatients from './PatientsPageService';

/**
 * @name PatientsPage
 * @description fetches patients from API and displays patients in a table format
 * @return component
 */
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
    if (sessionStorage.getItem('patientDeleted') === 'true') {
      toast.success('Patient has been successfully deleted.', {
        position: 'top-center',
        autoClose: 8000
      });
      sessionStorage.clear();
    }
    if (sessionStorage.getItem('patientCreated') === 'true') {
      toast.success('Patient has been successfully created.', {
        position: 'top-center',
        autoClose: 8000
      });
      sessionStorage.clear();
    }
  }, []);

  return (

    <div className={styles.pageContainer}>
      <button
        type="submit"
        className={styles.btnView}
        style={{ margin: '20px 0 0 30px' }}
        onClick={() => {
          history.push({
            pathname: '/patients/create'
          });
        }}
      >
        Create
      </button>
      <div className={styles.page}>
        {!apiError ? (
          <div data-testid="patientsTable">
            <PatientsTable
              patients={patients}
            />
          </div>
        ) : (<p data-testid="errMsg">{Constants.API_ERROR}</p>)}
      </div>
    </div>
  );
};

export default PatientsPage;
