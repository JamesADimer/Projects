/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import fetchEncounters from './PatientDetailsService';
import styles from './PatientDetails.module.css';

const PatientEncounters = () => {
  const { patientId } = useParams();
  const [encounters, setEncounters] = useState();
  const [apiError, setApiError] = useState(false);
  const history = useHistory();

  // const formatDate = (dateToFormat) => moment(dateToFormat, 'YYYY-MM-DD');

  useEffect(() => {
    fetchEncounters(patientId, setEncounters, setApiError);
  }, [patientId]);

  return (
    <div data-testid="encounterCollection">
      <button
        type="submit"
        className={styles.btnView}
        style={{ width: '100%', border: '3px solid white', fontSize: '20px' }}
        onClick={() => {
          history.push({
            pathname: `/patients/${patientId}/encounters/create`
          });
        }}
      >
        + Add Encounter
      </button>
      <br />
      <br />
      {
        !apiError ? (
          <>
            {encounters && encounters.sort((a, b) => (a.id > b.id ? 1 : -1)).map((encounter) => (
              <div key={encounter.id} data-testid="encounter">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={styles.encountersHeader}>
                      Encounter&nbsp;ID:
                      <br />
                      {encounter.id}
                    </Typography>
                    <hr />
                    <Typography className={styles.encountersHeader}>
                      Visit&nbsp;Code:
                      <br />
                      {encounter.visitCode}
                    </Typography>
                    <hr />
                    <Typography className={styles.encountersHeader}>
                      Provider:
                      <br />
                      {encounter.provider}
                    </Typography>
                    <hr />
                    <Typography className={styles.encountersHeader}>
                      Date:
                      <br />
                      {encounter.date}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={styles.encountersDetail}>
                      {encounter.notes ? (`Notes: ${encounter.notes}`) : ('Notes: --')}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {`Billing Code: ${encounter.billingCode}`}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {`ICD10: ${encounter.icD10}`}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {`Chief Complaint: ${encounter.chiefComplaint}`}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {encounter.pulse ? (`Pulse: ${encounter.pulse} bpm`) : ('Pulse: --')}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {encounter.systolic ? (`Systolic Pressure: ${encounter.systolic} mmHg`) : ('Systolic: --')}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {encounter.diastolic ? (`Diastolic Pressure: ${encounter.diastolic} mmHg`) : ('Diastolic: --')}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {`Copay: $${Number(encounter.copay).toFixed(2)}`}
                    </Typography>
                    <br />
                    <Typography className={styles.encountersDetail}>
                      {`Total Cost: $${Number(encounter.totalCost).toFixed(2)}`}
                    </Typography>
                    <br />
                    <hr />
                    <br />
                    <button
                      type="submit"
                      className={styles.btnView}
                      onClick={() => {
                        history.push({
                          pathname: `/patients/${encounter.patientId}/encounters/${encounter.id}/edit`
                        });
                      }}
                    >
                      Edit Encounter
                    </button>
                  </AccordionDetails>
                </Accordion>
                <br />
              </div>
            ))}
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>No encounters found!</p>
        )
        }
    </div>
  );
};
export default PatientEncounters;
