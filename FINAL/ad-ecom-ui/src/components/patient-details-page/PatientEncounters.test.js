import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import fetchEncounters from './PatientDetailsService';
import PatientEncounters from './PatientEncounters';

let container = null;
jest.mock('./PatientDetailsService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    patientId: '1'
  }),
  useRouteMatch: () => ({ url: '/patients/1' })
}));

describe('UserPurchaseHistory Component Tests', () => {
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
  const component = <PatientEncounters />;

  it('Displays valid encounter info', () => {
    // Arrange
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
    fetchEncounters.mockImplementation(
      (patientId, setEncounters, setApiError) => { // mock fetchProducts to return
        setEncounters(encounters);
        setApiError(false);
      }
    );

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('encounter')).toHaveLength(2);
  });

  it('Displays API error', () => {
    // Arrange
    fetchEncounters.mockImplementation(
      (patientId, setEncounters, setApiError) => { // mock fetchPurchases to return
        setApiError(true);
      }
    );

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getByTestId('encounterCollection')).toHaveTextContent('No encounters found!');
  });
});
