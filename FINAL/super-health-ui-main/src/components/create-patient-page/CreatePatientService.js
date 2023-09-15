import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * Post patient to database
 * @param {*} newPatient
 * @param {*} history
 */

const makePatient = async (newPatient, history) => {
  HttpHelper(Constants.PATIENTS_ENDPOINT, 'POST', newPatient)
    .then((response) => {
      if (response.ok) {
        toast.success('Patient has been successfully created.', {
          position: 'top-center',
          autoClose: 8000
        });
        history.push('/patients');
        return true;
      }
      if (response.status === 409) {
        toast.error('Email is already taken. Try a different one.', {
          position: 'top-center',
          autoClose: 8000
        });
        return false;
      }
      toast.error('Server Error. Patient has not been created. Please try again.', {
        position: 'top-center',
        autoClose: 8000
      });
      return false;
    });
};

export default makePatient;
