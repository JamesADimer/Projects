import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import PatientsTable from './PatientsTable';

jest.mock('./PatientsPageService');
let container = null;

describe('PatientsTable Component Tests', async () => {
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

  const fakePatients = [
    {
      id: 1,
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
      id: 2,
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

  // component to render
  const component = (
    <PatientsTable patients={fakePatients} />
  );

  it('table rows are created', () => {
    // Act
    render(
      component, container
    );

    // Asset
    expect(screen.getAllByTestId('1')).toHaveLength(1);
    expect(screen.getAllByTestId('2')).toHaveLength(1);
  });
});
