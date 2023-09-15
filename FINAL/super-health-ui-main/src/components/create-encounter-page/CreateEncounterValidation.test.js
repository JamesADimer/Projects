/* eslint-disable no-console */
import { unmountComponentAtNode } from 'react-dom';

import validate from './CreateEncounterValidation';

validate.validate = jest.fn();

let container = null;

let validEncounter = {};

describe('Create Encounter Validation test', () => {
  // Base setup
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    validEncounter.id = 1;
    validEncounter.patientId = 1;
    validEncounter.notes = '';
    validEncounter.visitCode = 'A1A 1A1';
    validEncounter.provider = 'Clinic';
    validEncounter.billingCode = '123.123.123-12';
    validEncounter.icD10 = 'A11';
    validEncounter.totalCost = 200.99;
    validEncounter.copay = 50.99;
    validEncounter.chiefComplaint = 'Head hurts';
    validEncounter.pulse = '';
    validEncounter.systolic = '';
    validEncounter.diastolic = '';
    validEncounter.date = '2021-11-24';
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    validEncounter = {};
  });

  // component to render

  it('Fails validation when a field is blank', () => {
    // Arrange
    const errors = {};
    const invalidEncounter = validEncounter;
    invalidEncounter.notes = '';
    invalidEncounter.visitCode = '';
    invalidEncounter.provider = '';
    invalidEncounter.billingCode = '';
    invalidEncounter.icD10 = '';
    invalidEncounter.totalCost = '';
    invalidEncounter.copay = '';
    invalidEncounter.chiefComplaint = '';
    invalidEncounter.pulse = '';
    invalidEncounter.systolic = '';
    invalidEncounter.diastolic = '';
    invalidEncounter.date = '';

    // Act
    errors.current = (validate(invalidEncounter));

    // Assert
    expect(errors.current.visitCode).toBe('This field is required.');
    expect(errors.current.provider).toBe('This field is required.');
    expect(errors.current.billingCode).toBe('This field is required.');
    expect(errors.current.icD10).toBe('This field is required.');
    expect(errors.current.totalCost).toBe('This field is required.');
    expect(errors.current.copay).toBe('This field is required.');
    expect(errors.current.chiefComplaint).toBe('This field is required.');
    expect(errors.current.date).toBe('This field is required.');
  });

  it('Fails validation when fields are not formatted correctly', () => {
    // Arrange
    const errors = {};
    const invalidEncounter = validEncounter;
    invalidEncounter.notes = 'Bl   ah';
    invalidEncounter.visitCode = 'A1A1A1';
    invalidEncounter.provider = 'Bla   h';
    invalidEncounter.billingCode = '12345678912';
    invalidEncounter.icD10 = 'AA1';
    invalidEncounter.totalCost = 10;
    invalidEncounter.copay = 10;
    invalidEncounter.chiefComplaint = 'B   lah';
    invalidEncounter.pulse = 'a';
    invalidEncounter.systolic = 'a';
    invalidEncounter.diastolic = 'a';
    invalidEncounter.date = '11/24/2021';

    // Act
    errors.current = validate(invalidEncounter);

    // Assert
    expect(errors.current.visitCode).toBe('Visit code must follow the following format: A1B 2C3');
    expect(errors.current.provider).toBe('Provider must not contain multiple spaces in a row');
    expect(errors.current.billingCode).toBe('Billing code must follow the following format: 123.456.789-12');
    expect(errors.current.icD10).toBe('ICD10 must follow the following format: A22');
    expect(errors.current.totalCost).toBe('Total cost must be a non-negative number with two decimal places');
    expect(errors.current.copay).toBe('Copay must be a non-negative number with two decimal places');
    expect(errors.current.chiefComplaint).toBe('Chief complaint must not contain multiple spaces in a row');
    expect(errors.current.date).toBe('Date must have a valid month/day and follow the following format: YYYY-MM-DD');
    expect(errors.current.pulse).toBe('Pulse must be a postive number.');
    expect(errors.current.systolic).toBe('Systolic blood pressure must be a postive number.');
    expect(errors.current.diastolic).toBe('Diastolic blood pressure must be a postive number.');
    expect(errors.current.notes).toBe('Notes must not contain multiple spaces in a row.');
  });

  // passes
  it('passes validation', () => {
    // Arrange
    const errors = {};

    // Act
    errors.current = {};
    errors.current = (validate(validEncounter));

    // Assert
    expect(errors.current).toStrictEqual({});
  });
});
