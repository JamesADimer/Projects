const validate = (encounter) => {
  const errors = {};
  if (!encounter.visitCode.toString().toString().trim()) {
    errors.visitCode = 'This field is required.';
  } else if (!/^([A-Z][0-9][A-Z]) ([0-9][A-Z][0-9])$/.test(encounter.visitCode)) {
    errors.visitCode = 'Visit code must follow the following format: A1B 2C3';
  }
  if (!encounter.provider.toString().toString().trim()) {
    errors.provider = 'This field is required.';
  } else if (/^\s+|\s{2,}|\s+$/.test(encounter.provider)) {
    errors.provider = 'Provider must not contain multiple spaces in a row';
  }
  if (!encounter.billingCode.toString().toString().trim()) {
    errors.billingCode = 'This field is required.';
  } else if (!/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(encounter.billingCode)) {
    errors.billingCode = 'Billing code must follow the following format: 123.456.789-12';
  }
  if (!encounter.icD10.toString().trim()) {
    errors.icD10 = 'This field is required.';
  } else if (!/^[A-Z][0-9]{2}$/.test(encounter.icD10)) {
    errors.icD10 = 'ICD10 must follow the following format: A22';
  }
  if (!encounter.totalCost.toString().trim()) {
    errors.totalCost = 'This field is required.';
  } else if (!/^[0-9]+\.[0-9]{2}$/.test(encounter.totalCost)) {
    errors.totalCost = 'Total cost must be a non-negative number with two decimal places';
  }
  if (!encounter.copay.toString().trim()) {
    errors.copay = 'This field is required.';
  } else if (!/^[0-9]+\.[0-9]{2}$/.test(encounter.copay)) {
    errors.copay = 'Copay must be a non-negative number with two decimal places';
  }
  if (!encounter.chiefComplaint.toString().trim()) {
    errors.chiefComplaint = 'This field is required.';
  } else if (/^\s+|\s{2,}|\s+$/.test(encounter.chiefComplaint)) {
    errors.chiefComplaint = 'Chief complaint must not contain multiple spaces in a row';
  }
  if (!encounter.date.toString().trim()) {
    errors.date = 'This field is required.';
  } else if (!/^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/.test(encounter.date)) {
    errors.date = 'Date must have a valid month/day and follow the following format: YYYY-MM-DD';
  }
  if (encounter.pulse.toString().trim() && !/^\d+$/.test(encounter.pulse)) {
    errors.pulse = 'Pulse must be a postive number.';
  }
  if (encounter.systolic.toString().trim() && !/^\d+$/.test(encounter.systolic)) {
    errors.systolic = 'Systolic blood pressure must be a postive number.';
  }
  if (encounter.diastolic.toString().trim() && !/^\d+$/.test(encounter.diastolic)) {
    errors.diastolic = 'Diastolic blood pressure must be a postive number.';
  }
  if (encounter.notes.toString().trim() && /^\s+|\s{2,}|\s+$/.test(encounter.notes)) {
    errors.notes = 'Notes must not contain multiple spaces in a row.';
  }

  return errors;
};
export default validate;
