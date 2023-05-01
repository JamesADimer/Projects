const validate = (encounter) => {
  const errors = {};
  if (!encounter.visit_code.toString().toString().trim()) {
    errors.visitCode = 'This field is required.';
  } else if (!/^([A-Z][0-9][A-Z]) ([0-9][A-Z][0-9])$/.test(encounter.visit_code)) {
    errors.visitCode = 'Visit code must follow the following format: A1B 2C3';
  }
  if (!encounter.provider.toString().toString().trim()) {
    errors.provider = 'This field is required.';
  } else if (/^\s+|\s{2,}|\s+$/.test(encounter.provider)) {
    errors.provider = 'Provider must not contain multiple spaces in a row';
  }
  if (!encounter.billing_code.toString().toString().trim()) {
    errors.billingCode = 'This field is required.';
  } else if (!/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(encounter.billing_code)) {
    errors.billingCode = 'Billing code must follow the following format: 123.456.789-12';
  }
  if (!encounter.icd10.toString().trim()) {
    errors.icD10 = 'This field is required.';
  } else if (!/^[A-Z][0-9]{2}$/.test(encounter.icd10)) {
    errors.icD10 = 'ICD10 must follow the following format: A22';
  }
  if (!encounter.total_cost.toString().trim()) {
    errors.totalCost = 'This field is required.';
  } else if (!/^[0-9]+\.[0-9]{2}$/.test(encounter.total_cost)) {
    errors.totalCost = 'Total cost must be a non-negative number with two decimal places';
  }
  if (!encounter.copay.toString().trim()) {
    errors.copay = 'This field is required.';
  } else if (!/^[0-9]+\.[0-9]{2}$/.test(encounter.copay)) {
    errors.copay = 'Copay must be a non-negative number with two decimal places';
  }
  if (!encounter.chief_complaint.toString().trim()) {
    errors.chiefComplaint = 'This field is required.';
  } else if (/^\s+|\s{2,}|\s+$/.test(encounter.chief_complaint)) {
    errors.chiefComplaint = 'Chief complaint must not contain multiple spaces in a row';
  }
  if (!encounter.date.toString().trim()) {
    errors.date = 'This field is required.';
  } else if (!/^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/.test(encounter.date)) {
    errors.date = 'Date must have a valid month/day and follow the following format: YYYY-MM-DD';
  }
  if (encounter.pulse.toString().trim() && !/^[1-9]\d*$/.test(encounter.pulse)) {
    errors.pulse = 'Pulse must be a postive number.';
  }
  if (encounter.systolic.toString().trim() && !/^[1-9]\d*$/.test(encounter.systolic)) {
    errors.systolic = 'Systolic blood pressure must be a postive number.';
  }
  if (encounter.diastolic.toString().trim() && !/^[1-9]\d*$/.test(encounter.diastolic)) {
    errors.diastolic = 'Diastolic blood pressure must be a postive number.';
  }
  if (encounter.notes.toString().trim() && /^\s+|\s{2,}|\s+$/.test(encounter.notes)) {
    errors.notes = 'Notes must not contain multiple spaces in a row.';
  }

  return errors;
};
export default validate;
