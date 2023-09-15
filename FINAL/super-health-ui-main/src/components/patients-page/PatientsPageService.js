import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name fetchPatients
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPatients sets state for patients
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for patients if 200 response, else sets state for apiError
 */
const fetchPatients = async (setPatients, setApiError) => {
  await HttpHelper(Constants.PATIENTS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPatients)
    .catch(() => {
      setApiError(true);
    });
};
export default fetchPatients;
