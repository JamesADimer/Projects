/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import CreatePatientPage from './CreatePatientPage';

// mock PatientsPageService call
jest.mock('./CreatePatientService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useHistory: () => ({
    push: jest.fn()
  })
}));

let container = null;

describe('Create Patient Page Component Tests', () => {
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
  const component = <CreatePatientPage />;

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
