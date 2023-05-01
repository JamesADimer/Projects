import React from 'react';
import FormItem from '../form/FormItem';
import styles from '../create-patient-page/CreatePatient.module.css';

const CreateEncounterForm = ({
  onFormChange, formData, errors, patientId
}) => (
  <div className={styles.createPatient}>
    <div className={styles.center} data-testid="formItems">
      <p data-testid="patientId">{`Patient ID: ${patientId}`}</p>
      <FormItem
        type="text"
        id="notes"
        label="Notes"
        onChange={onFormChange}
        value={formData.notes}
        errorMessage={errors.notes
          && <span className={styles.span}>{errors.notes}</span>}
      />
      <FormItem
        type="text"
        id="visitCode"
        label="Visit Code"
        onChange={onFormChange}
        value={formData.visit_code}
        errorMessage={
          errors.visitCode
          && <span className={styles.span}>{errors.visitCode}</span>
        }
      />
      <FormItem
        type="text"
        id="provider"
        label="Provider"
        onChange={onFormChange}
        value={formData.provider}
        errorMessage={errors.provider
          && <span className={styles.span}>{errors.provider}</span>}
      />
      <FormItem
        type="text"
        id="billingCode"
        label="Billing Code"
        onChange={onFormChange}
        value={formData.billing_code}
        errorMessage={errors.billingCode
          && <span className={styles.span}>{errors.billingCode}</span>}
      />
      <FormItem
        type="text"
        id="icD10"
        label="ICD 10"
        onChange={onFormChange}
        value={formData.icd10}
        errorMessage={errors.icD10 && <span className={styles.span}>{errors.icD10}</span>}
      />
      <FormItem
        type="text"
        id="totalCost"
        label="Total Cost"
        onChange={onFormChange}
        value={formData.total_cost}
        errorMessage={errors.totalCost
          && <span className={styles.span}>{errors.totalCost}</span>}
      />
      <FormItem
        type="text"
        id="copay"
        label="Copay"
        onChange={onFormChange}
        value={formData.copay}
        errorMessage={
          errors.copay
          && <span className={styles.span}>{errors.copay}</span>
        }
      />
      <FormItem
        type="text"
        id="chiefComplaint"
        label="Chief Complaint"
        onChange={onFormChange}
        value={formData.chief_complaint}
        errorMessage={errors.chiefComplaint
          && <span className={styles.span}>{errors.chiefComplaint}</span>}
      />
      <FormItem
        type="text"
        id="pulse"
        label="Pulse"
        onChange={onFormChange}
        value={formData.pulse}
        errorMessage={errors.pulse
          && <span className={styles.span}>{errors.pulse}</span>}
      />
      <FormItem
        type="text"
        id="systolic"
        label="Systolic"
        onChange={onFormChange}
        value={formData.systolic}
        errorMessage={
          errors.systolic
          && <span className={styles.span}>{errors.systolic}</span>
        }
      />
      <FormItem
        type="text"
        id="diastolic"
        label="Diastolic"
        onChange={onFormChange}
        value={formData.diastolic}
        errorMessage={errors.diastolic
          && <span className={styles.span}>{errors.diastolic}</span>}
      />
      <FormItem
        type="text"
        id="date"
        label="Date"
        onChange={onFormChange}
        value={formData.date}
        errorMessage={errors.date
          && <span className={styles.span}>{errors.date}</span>}
      />
    </div>
  </div>
);

export default CreateEncounterForm;
