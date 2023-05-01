/* eslint-disable no-console */
import { unmountComponentAtNode } from 'react-dom';

import validate from './CreatePatientValidation';

validate.validate = jest.fn();

let container = null;

let validPatient = {};

describe('Create Patient Validation test', () => {
  // Base setup
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    validPatient.id = 1;
    validPatient.firstName = 'Jimmy';
    validPatient.lastName = 'Dimer';
    validPatient.ssn = '123-12-1234';
    validPatient.email = 'jdimer@catalyte.io';
    validPatient.age = 25;
    validPatient.height = 65;
    validPatient.weight = 200;
    validPatient.insurance = 'Uninsured';
    validPatient.gender = 'Male';
    validPatient.street = '20 W Kinzie St';
    validPatient.city = 'Chicago';
    validPatient.state = 'IL';
    validPatient.postal = 60610;
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    validPatient = {};
  });

  // component to render

  it('Fails validation when a field is blank', () => {
    // Arrange
    const errors = {};
    const invalidPatient = validPatient;
    invalidPatient.firstName = '';
    invalidPatient.lastName = '';
    invalidPatient.ssn = '';
    invalidPatient.email = '';
    invalidPatient.age = '';
    invalidPatient.height = '';
    invalidPatient.weight = '';
    invalidPatient.insurance = '';
    invalidPatient.gender = '';
    invalidPatient.street = '';
    invalidPatient.city = '';
    invalidPatient.state = 'Select state';
    invalidPatient.postal = '';

    // Act
    errors.current = (validate(invalidPatient));

    // Assert
    expect(errors.current.firstName).toBe('This field is required.');
    expect(errors.current.lastName).toBe('This field is required.');
    expect(errors.current.ssn).toBe('This field is required.');
    expect(errors.current.email).toBe('This field is required.');
    expect(errors.current.age).toBe('This field is required.');
    expect(errors.current.height).toBe('This field is required.');
    expect(errors.current.weight).toBe('This field is required.');
    expect(errors.current.insurance).toBe('This field is required.');
    expect(errors.current.gender).toBe('This field is required.');
    expect(errors.current.street).toBe('This field is required.');
    expect(errors.current.city).toBe('This field is required.');
    expect(errors.current.state).toBe('This field is required.');
    expect(errors.current.postal).toBe('This field is required.');
  });

  it('Fails validation when firstname or lastname have multiple spaces in a row', () => {
    // Arrange
    const errors = {};
    const invalidPatient = validPatient;
    invalidPatient.firstName = 'Ji   mmy';
    invalidPatient.lastName = 'D  imer';

    // Act
    errors.current = (validate(invalidPatient));

    // Assert
    expect(errors.current.firstName).toBe('First name must not contain multiple spaces in a row');
    expect(errors.current.lastName).toBe('Last name must not contain multiple spaces in a row');
  });

  it('Fails validation when fields have special characters other than those allowed', () => {
    // Arrange
    const errors = {};
    const invalidPatient = validPatient;
    invalidPatient.firstName = '%^$%$';
    invalidPatient.lastName = '%^&%$^$';

    // Act
    errors.current = (validate(invalidPatient));

    // Assert
    expect(errors.current.firstName).toBe('Apostrophe ( \' ) and dash ( - ) are the only special characters allowed.');
    expect(errors.current.lastName).toBe('Apostrophe ( \' ) and dash ( - ) are the only special characters allowed.');
  });

  it('Fails validation when fields are not formatted correctly', () => {
    // Arrange
    const errors = {};
    const invalidPatient = validPatient;
    invalidPatient.ssn = '123121234';
    invalidPatient.email = 'invalid email';
    invalidPatient.age = 'string';
    invalidPatient.height = 'string';
    invalidPatient.weight = 'string';
    invalidPatient.gender = 'Non-binary';
    invalidPatient.postal = '123';

    // Act
    errors.current = validate(invalidPatient);

    // Assert
    expect(errors.current.ssn).toBe('SSN must follow the following format: 123-12-1234');
    expect(errors.current.email).toBe('Email must follow the following format: username@domain.com');
    expect(errors.current.age).toBe('Age must be a positive whole number');
    expect(errors.current.height).toBe('Height must be a positive whole number');
    expect(errors.current.weight).toBe('Weight must be a positive whole number');
    expect(errors.current.gender).toBe('Gender must be Male, Female, or Other');
    expect(errors.current.postal).toBe('Postal code must follow the format 12345 or 12345-1234');
  });

  // passes
  it('passes validation', () => {
    // Arrange
    const errors = {};

    // Act
    errors.current = {};
    errors.current = (validate(validPatient));

    // Assert
    expect(errors.current).toStrictEqual({});
  });
});
