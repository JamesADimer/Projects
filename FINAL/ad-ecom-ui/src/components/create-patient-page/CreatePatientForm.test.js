/* eslint-disable max-len */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import CreatePatientForm from './CreatePatientForm';
import constants from '../../utils/constants';

let container = null;
let patient = {};
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
    patient = {};
    errors = {};
  });

  // component to render
  const component = <CreatePatientForm onFormChange={onFormChange} formData={patient} errors={errors} stateOptions={constants.STATES_ARRAY} />;

  it('Form loads form items', () => {
    // Arrange

    // Act
    render(
      component, container
    );

    // Assert
    expect(screen.getAllByTestId('formItems')).toHaveLength(1);
  });
});
