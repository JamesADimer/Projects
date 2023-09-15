import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import styles from '../create-patient-page/CreatePatientContainer.module.css';
import CreateEncounterForm from '../create-encounter-page/CreateEncounterForm';
import updateEncounter, { fetchEncounter } from './EditEncounterService';
import validate from '../create-encounter-page/CreateEncounterValidation';
import constants from '../../utils/constants';

/**
 * @name Edit Encounter
 * @description A view that contains details needed to process editing an encounter
 * @return component
 */
const EditEncounterPage = () => {
  const history = useHistory();
  const { patientId, encounterId } = useParams();
  const [encounter, setEncounter] = useState({});
  const [apiError, setApiError] = useState(false);
  const [errorsText, setErrorsText] = useState({});
  const errors = useRef(0);
  const onFormChange = (e) => {
    setEncounter({ ...encounter, [e.target.id]: e.target.value });
  };

  /**
   * Handle Submit
   * @param {e} submit event
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    errors.current = (validate(encounter));
    setErrorsText(errors.current);
    const newEncounter = {
      PatientId: encounter.patientId,
      Notes: encounter.notes,
      VisitCode: encounter.visitCode,
      Provider: encounter.provider,
      BillingCode: encounter.billingCode,
      ICD10: encounter.icD10,
      TotalCost: encounter.totalCost,
      Copay: encounter.copay,
      ChiefComplaint: encounter.chiefComplaint,
      Pulse: encounter.pulse ? encounter.pulse : null,
      Systolic: encounter.systolic ? encounter.systolic : null,
      Diastolic: encounter.diastolic ? encounter.diastolic : null,
      Date: encounter.date
    };
    if (Object.keys(errors.current).length === 0) {
      setEncounter({
        patientId,
        notes: encounter.notes,
        visitCode: encounter.visitCode,
        provider: encounter.provider,
        billingCode: encounter.billingCode,
        icD10: encounter.icD10,
        totalCost: encounter.totalCost,
        copay: encounter.copay,
        chiefComplaint: encounter.chiefComplaint,
        pulse: encounter.pulse ? encounter.pulse : '',
        systolic: encounter.systolic ? encounter.systolic : '',
        diastolic: encounter.diastolic ? encounter.diastolic : '',
        date: encounter.date
      });
      return updateEncounter(patientId, encounterId, newEncounter, history);
    }
    toast.error('Invalid entry. Please check form for errors.', {
      position: 'top-center',
      autoClose: 8000
    });
    return false;
  };

  useEffect(() => {
    fetchEncounter(patientId, encounterId, setEncounter, setApiError);
  }, [patientId, encounterId]);

  return (
    <div className={styles.pageContainer}>
      {!apiError ? (
        <Grid justify="center" container className={styles.checkoutContainer}>
          <form onSubmit={handleSubmit} className={styles.step}>
            <h3 className={styles.title}>Edit Encounter</h3>
            <Grid item data-testid="form">
              <CreateEncounterForm
                onFormChange={onFormChange}
                formData={encounter}
                errors={errorsText}
                patientId={patientId}
              />
              <Grid container id="submitButton" justify="center">
                <input className={`${styles.summary}  ${styles.payButton}`} type="submit" value="Edit Encounter" />
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : (<p data-testid="errMsg">{constants.API_ERROR}</p>)}
    </div>
  );
};

export default EditEncounterPage;