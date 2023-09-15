import { useHistory } from 'react-router-dom';
import React from 'react';
import { Search } from '@material-ui/icons';
import styles from './PatientsTable.module.css';

/**
 * @name PatientsTable
 * @param patients patients from the database
 * @param {*} setPatients sets state for patients
 * @description creates the header for the table & takes each patients to make a row
 */
const PatientsTable = ({ patients }) => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}><Search /></th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              className={styles.maintenanceRow}
              key={patient.id}
              id={patient.id}
              data-testid={patient.id}
            >
              <td>
                <div>
                  <button
                    type="submit"
                    className={styles.btnView}
                    onClick={() => {
                      history.push({
                        pathname: `/patients/${patient.id}`
                      });
                    }}
                    aria-label="view patient"
                  >
                    Details
                  </button>
                </div>
              </td>
              <td>
                {`${patient.firstName} ${patient.lastName}`}
              </td>
              <td>
                {patient.age}
              </td>
              <td>
                {patient.gender}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
