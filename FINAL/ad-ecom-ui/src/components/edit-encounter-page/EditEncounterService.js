import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchEncounter
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} patientId patient's id
 * @param {*} encounterId encounter's id
 * @param {*} setEncounter sets state for encounter
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for patients if 200 response, else sets state for apiError
 */
export const fetchEncounter = async (patientId, encounterId, setEncounter, setApiError) => {
  const queryString = `/${patientId}/encounters/${encounterId}`;
  await HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setEncounter)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * Update an encounter in the database
 * @param {*} patientId
 * @param {*} editedEncounter
 * @param {*} history
 */

const updateEncounter = async (patientId, encounterId, editedEncounter, history) => {
  const queryString = `/${patientId}/encounters/${encounterId}`;
  HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'PUT', editedEncounter)
    .then((response) => {
      if (response.ok) {
        sessionStorage.setItem('encounterUpdated', 'true');
        history.push(`/patients/${patientId}`);
        return true;
      }
      toast.error('Server Error. Encounter has not been changed. Please try again.', {
        position: 'top-center',
        autoClose: 8000
      });
      return false;
    });
};

export default updateEncounter;
