import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * Post encounter to database
 * @param {*} patientId
 * @param {*} newEncounter
 * @param {*} history
 */

const makeEncounter = async (patientId, newEncounter, history) => {
  const queryString = `/${patientId}/encounters`;
  HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'POST', newEncounter)
    .then((response) => {
      if (response.ok) {
        toast.success('Encounter has been successfully created.', {
          position: 'top-center',
          autoClose: 8000
        });
        history.push(`/patients/${patientId}`);
        return true;
      }
      toast.error('Server Error. Encounter has not been created. Please try again.', {
        position: 'top-center',
        autoClose: 8000
      });
      return false;
    });
};

export default makeEncounter;
