/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import EditPatientPage from './EditPatientPage';
import { fetchPatient } from '../patient-details-page/PatientDetailsService';

// mock PatientsPageService call
jest.mock('./EditPatientService');
jest.mock('../patient-details-page/PatientDetailsService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    patientId: '1'
  }),
  useRouteMatch: () => ({ url: '/patients/1/edit' })
}));

let container = null;

describe('Edit Patient Page Component Tests', () => {
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
  const component = <EditPatientPage />;

  it('Page loads form', () => {
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
    fetchPatient.mockImplementation((patientId, setPatient, setApiError) => { // mock fetchPatient to return
      setPatient(patient);
      setApiError(false);
    });

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('form')).toHaveLength(1);
  });
});
