/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import CreateEncounterForm from './CreateEncounterForm';

let container = null;
let encounter = {};
let errors = {};
const onFormChange = jest.fn();

describe('Create Patient Form Component Tests', () => {
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
    encounter = {};
    errors = {};
  });

  // component to render
  const component = <CreateEncounterForm onFormChange={onFormChange} formData={encounter} errors={errors} patientId={1} />;

  it('Form loads form items', () => {
    // Arrange

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('formItems')).toHaveLength(1);
    expect(screen.getByTestId('patientId')).toHaveTextContent('Patient ID: 1');
  });
});
