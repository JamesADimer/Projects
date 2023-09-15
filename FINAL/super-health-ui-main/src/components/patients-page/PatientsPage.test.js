import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import PatientsPage from './PatientsPage';
import fetchPatients from './PatientsPageService';

// mock PatientsPageService call
jest.mock('./PatientsPageService');

let container = null;

describe('ProductPage Component Tests', () => {
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
  const component = <PatientsPage />;

  it('creates a table', () => {
    // Arrange
    const fakePatients = [
      {
        firstName: 'Jimmy',
        lastName: 'Dimer',
        ssn: '123-45-6789',
        email: 'jdimer@catalyte.io',
        age: 25,
        height: 65,
        weight: 200,
        insurance: 'Blue Cross Blue Shield',
        gender: 'Male',
        street: '20 W Kinzie St Suite 1420',
        city: 'Chicago',
        state: 'IL',
        postal: '60610'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        ssn: '978-65-4321',
        email: 'jdoe@gmail.com',
        age: 23,
        height: 67,
        weight: 180,
        insurance: 'Self-insured',
        gender: 'Male',
        street: '123 Sesame St',
        city: 'Chicago',
        state: 'IL',
        postal: '12345-1234'
      }
    ];
    fetchPatients.mockImplementation((setPatients, setApiError) => { // mock fetchPatients to return
      setPatients(fakePatients);
      setApiError(false);
    });

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('patientsTable')).toHaveLength(1);
  });

  it('Displays error message', () => {
    // Arrange
    fetchPatients.mockImplementation((setPatients, setApiError) => { // mock fetchPatient to return
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
