/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import EditEncounterPage from './EditEncounterPage';
import { fetchEncounter } from './EditEncounterService';

// mock PatientsPageService call
jest.mock('./EditEncounterService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    patientId: '1',
    encounterId: '1'
  }),
  useRouteMatch: () => ({ url: '/patients/1/encounters/1/create' })
}));

let container = null;

describe('Edit Encounter Page Component Tests', () => {
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
  const component = <EditEncounterPage />;

  it('Page loads form', () => {
    // Arrange
    const encounter = {
      id: 1,
      patientId: 1,
      notes: '',
      visitCode: 'A1A 1A1',
      provider: 'Clinic',
      billingCode: '123.123.123-12',
      icD10: 'A11',
      totalCost: 10.99,
      copay: 5.99,
      chiefComplaint: 'Head hurts',
      pulse: '',
      systolic: '',
      diastolic: '',
      date: '2021-11-24'
    };
    fetchEncounter.mockImplementation((patientId, encounterId, setEncounter, setApiError) => { // mock fetchPatient to return
      setEncounter(encounter);
      setApiError(false);
    });

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('form')).toHaveLength(1);
  });

  it('Page loads error message', () => {
    // Arrange
    fetchEncounter.mockImplementation((patientId, encounterId, setEncounter, setApiError) => { // mock fetchPatient to return
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
