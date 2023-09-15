import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * Update an encounter in the database
 * @param {*} patientId
 * @param {*} editedPatient
 * @param {*} history
 */

const updatePatient = async (patientId, editedPatient, history) => {
  const queryString = `/${patientId}`;
  HttpHelper(Constants.PATIENTS_ENDPOINT + queryString, 'PUT', editedPatient)
    .then((response) => {
      if (response.ok) {
        toast.success('Patient has been successfully updated.', {
          position: 'top-center',
          autoClose: 8000
        });
        history.push(`/patients/${patientId}`);
        return true;
      }
      if (response.status === 409) {
        toast.error('Email is already taken. Try a different one.', {
          position: 'top-center',
          autoClose: 8000
        });
        return false;
      }
      toast.error('Server Error. Patient has not been changed. Please try again.', {
        position: 'top-center',
        autoClose: 8000
      });
      return false;
    });
};

export default updatePatient;
