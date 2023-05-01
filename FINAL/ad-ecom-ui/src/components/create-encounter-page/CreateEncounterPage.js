import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from '@material-ui/core';
import styles from '../create-patient-page/CreatePatientContainer.module.css';
import CreateEncounterForm from './CreateEncounterForm';
import makeEncounter from './CreateEncounterService';
import validate from './CreateEncounterValidation';

/**
 * @name Create Encounter
 * @description A view that contains details needed to process the creation of an encounter
 * @return component
 */
const CreateEncounterPage = () => {
  const history = useHistory();
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    encounterPatientId: patientId,
    notes: '',
    visitCode: '',
    provider: '',
    billingCode: '',
    icD10: '',
    totalCost: '',
    copay: '',
    chiefComplaint: '',
    pulse: '',
    systolic: '',
    diastolic: '',
    date: ''
  });
  const [errorsText, setErrorsText] = useState({});
  const errors = useRef(0);
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * Handle Submit
   * @param {e} submit event
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    errors.current = (validate(formData));
    setErrorsText(errors.current);
    const newEncounter = {
      patient_id: formData.encounterPatientId,
      notes: formData.notes,
      visit_code: formData.visitCode,
      provider: formData.provider,
      billing_code: formData.billingCode,
      icd10: formData.icD10,
      total_cost: formData.totalCost,
      copay: formData.copay,
      chief_complaint: formData.chiefComplaint,
      pulse: formData.pulse ? formData.pulse : null,
      systolic: formData.systolic ? formData.systolic : null,
      diastolic: formData.diastolic ? formData.diastolic : null,
      date: formData.date
    };
    if (Object.keys(errors.current).length === 0) {
      return makeEncounter(patientId, newEncounter, history);
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
          <h3 className={styles.title}>Create Encounter</h3>
          <Grid item data-testid="form">
            <CreateEncounterForm
              onFormChange={onFormChange}
              formData={formData}
              errors={errorsText}
              patientId={patientId}
            />
            <Grid container id="submitButton" justify="center" data-testid="submitBtn">
              <input className={`${styles.summary}  ${styles.payButton}`} type="submit" value="Create Encounter" />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default CreateEncounterPage;
