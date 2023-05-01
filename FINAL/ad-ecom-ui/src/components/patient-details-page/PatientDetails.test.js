/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import PatientDetails from './PatientDetails';
import fetchEncounters, { fetchPatient } from './PatientDetailsService';

// mock PatientsPageService call
jest.mock('./PatientDetailsService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    patientId: '1'
  }),
  useRouteMatch: () => ({ url: '/patients/1' })
}));

let container = null;

describe('Patient Details Component Tests', () => {
  // Base setup
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  // component to render
  const component = <PatientDetails />;

  it('Displays valid patient information', () => {
    // Arrange
    const patient = {
      id: 1,
      firstName: 'Jimmy',
      lastName: 'Dimer',
      ssn: '123-12-1234',
      email: 'jdimer@catalyte.io',
      age: 25,
      height: 65,
      weight: 200,
      insurance: 'Uninsured',
      gender: 'Male',
      street: '20 W Kinzie St',
      city: 'Chicago',
      state: 'IL',
      postal: 60610
    };
    const encounters = [
      {
        id: 1,
        patientId: 1,
        notes: '',
        visitCode: '',
        provider: '',
        billingCode: '',
        icD10: '',
        totalCost: '',
        copay: '',
        chiefComplaint: '',
        pulse: '',
        systolic: '',
        diastolic: '',
        date: ''
      },
      {
        id: 2,
        patientId: 1,
        notes: '',
        visitCode: '',
        provider: '',
        billingCode: '',
        icD10: '',
        totalCost: '',
        copay: '',
        chiefComplaint: '',
        pulse: '',
        systolic: '',
        diastolic: '',
        date: ''
      }
    ];
    fetchPatient.mockImplementation((patientId, setPatient, setApiError) => { // mock fetchPatient to return
      setPatient(patient);
      setApiError(false);
    });
    fetchEncounters.mockImplementation((patientId, setEncounters, setApiError) => { // mock fetchPatient to return
      setEncounters(encounters);
      setApiError(false);
    });

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getByTestId('patientId')).toHaveTextContent('1');
    expect(screen.getByTestId('firstname')).toHaveTextContent('Jimmy');
    expect(screen.getByTestId('lastname')).toHaveTextContent('Dimer');
    expect(screen.getByTestId('ssn')).toHaveTextContent('123-12-1234');
    expect(screen.getByTestId('email')).toHaveTextContent('jdimer@catalyte.io');
    expect(screen.getByTestId('age')).toHaveTextContent('25');
    expect(screen.getByTestId('height')).toHaveTextContent('65');
    expect(screen.getByTestId('weight')).toHaveTextContent('200');
    expect(screen.getByTestId('insurance')).toHaveTextContent('Uninsured');
    expect(screen.getByTestId('gender')).toHaveTextContent('Male');
    expect(screen.getByTestId('street')).toHaveTextContent('20 W Kinzie St');
    expect(screen.getByTestId('city')).toHaveTextContent('Chicago');
    expect(screen.getByTestId('state')).toHaveTextContent('IL');
    expect(screen.getByTestId('postal')).toHaveTextContent('60610');

    expect(screen.getAllByTestId('encounters')).toHaveLength(1);
  });

  it('Displays error message', () => {
    // Arrange
    fetchPatient.mockImplementation((patientId, setPatient, setApiError) => { // mock fetchPatient to return
      setApiError(true);
    });
    fetchEncounters.mockImplementation((patientId, setEncounters, setApiError) => { // mock fetchPatient to return
      setApiError(true);
    });

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getByTestId('errMsg')).toHaveTextContent('Oops, something went wrong');
  });
});
