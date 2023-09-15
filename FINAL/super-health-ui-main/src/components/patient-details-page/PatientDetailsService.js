import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchPatient
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} patientId patient's id
 * @param {*} setPatient sets state for patient
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for patients if 200 response, else sets state for apiError
 */
export const fetchPatient = async (patientId, setPatient, setApiError) => {
  const queryString = `/${patientId}`;
  await HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPatient)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name deletePatient
 * @param patientId - the id for the patient
 * @returns boolean response
 */
export const deletePatient = async (patientId, history) => {
  const queryString = `/${patientId}`;
  HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'DELETE')
    .then((response) => {
      if (response.ok) {
        sessionStorage.setItem('patientDeleted', 'true');
        history.push({
          pathname: '/patients'
        });
        return true;
      }
      if (response.status === 409) {
        toast.error('Patient has encounters and cannot be deleted.', {
          position: 'top-center',
          autoClose: 8000
        });
        return false;
      }
      toast.error('Server Error. Patient has not been deleted. Please try again.', {
        position: 'top-center',
        autoClose: 8000
      });
      return false;
    });
};

/**
 * @name fetchEncounters
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} patientId patient's id
 * @param {*} setEncounters sets state for encounters
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for encounters if 200 response, else sets state for apiError
 */
const fetchEncounters = async (patientId, setEncounters, setApiError) => {
  const queryString = `/${patientId}/encounters`;
  await HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setEncounters)
    .catch(() => {
      setApiError(true);
    });
};
export default fetchEncounters;
