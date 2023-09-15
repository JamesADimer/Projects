/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import CreateEncounterPage from './CreateEncounterPage';

// mock PatientsPageService call
jest.mock('./CreateEncounterService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    patientId: '1'
  }),
  useRouteMatch: () => ({ url: '/patients/1/encounters/create' })
}));

let container = null;

describe('Create Encounter Page Component Tests', () => {
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
  const component = <CreateEncounterPage />;

  it('Page loads form', () => {
    // Arrange

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('form')).toHaveLength(1);
    expect(screen.getAllByTestId('submitBtn')).toHaveLength(1);
  });
});
