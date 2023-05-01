const validate = (patient) => {
  const errors = {};
  if (!patient.first_name.toString().trim()) {
    errors.first_name = 'This field is required.';
  } else if (/^\s+|\s{2,}|\s+$/.test(patient.first_name)) {
    errors.first_name = 'First name must not contain multiple spaces in a row';
  } else if (/[^A-Za-z \-']/.test(patient.first_name)) {
    errors.first_name = 'Apostrophe ( \' ) and dash ( - ) are the only special characters allowed.';
  }
  if (!patient.last_name.toString().trim()) {
    errors.last_name = 'This field is required.';
  } else if (/^\s+|\s{2,}|\s+$/.test(patient.last_name)) {
    errors.last_name = 'Last name must not contain multiple spaces in a row';
  } else if (/[^A-Za-z \-']/.test(patient.last_name)) {
    errors.last_name = 'Apostrophe ( \' ) and dash ( - ) are the only special characters allowed.';
  }
  if (!patient.ssn.toString().trim()) {
    errors.ssn = 'This field is required.';
  } else if (!/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(patient.ssn)) {
    errors.ssn = 'SSN must follow the following format: 123-12-1234';
  }
  if (!patient.email.toString().trim()) {
    errors.email = 'This field is required.';
  } else if (!/^[A-Za-z0-9]+@[A-Za-z]+\.([A-Za-z]{2,4})$/.test(patient.email)) {
    errors.email = 'Email must follow the following format: username@domain.com';
  }
  if (!patient.age.toString().trim()) {
    errors.age = 'This field is required.';
  } else if (!/^[1-9]\d*$/.test(patient.age)) {
    errors.age = 'Age must be a positive whole number';
  }
  if (!patient.height.toString().trim()) {
    errors.height = 'This field is required.';
  } else if (!/^[1-9]\d*$/.test(patient.height)) {
    errors.height = 'Height must be a positive whole number';
  }
  if (!patient.weight.toString().trim()) {
    errors.weight = 'This field is required.';
  } else if (!/^[1-9]\d*$/.test(patient.weight)) {
    errors.weight = 'Weight must be a positive whole number';
  }
  if (!patient.insurance.toString().trim()) {
    errors.insurance = 'This field is required.';
  }
  if (!patient.gender.toString().trim()) {
    errors.gender = 'This field is required.';
  } else if (patient.gender !== 'Male' && patient.gender !== 'Female' && patient.gender !== 'Other') {
    errors.gender = 'Gender must be Male, Female, or Other';
  }
  if (!patient.street.toString().trim()) {
    errors.street = 'This field is required.';
  }
  if (!patient.city.toString().trim()) {
    errors.city = 'This field is required.';
  }
  if (patient.state === 'Select state') {
    errors.state = 'This field is required.';
  }
  if (!patient.postal.toString().trim()) {
    errors.postal = 'This field is required.';
  } else if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(patient.postal)) {
    errors.postal = 'Postal code must follow the format 12345 or 12345-1234';
  }

  return errors;
};
export default validate;
