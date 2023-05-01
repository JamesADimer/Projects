import { toast } from 'react-toastify';
import { waitFor } from '@testing-library/react';
import makePatient from './CreatePatientService';
import HttpHelper from '../../utils/HttpHelper';

// mock httpHelper
jest.mock('../../utils/HttpHelper');

// mocks the router dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/'
  }),
  useHistory: () => ({
    push: jest.fn()
  })
}));

// test suite for PatientDetailsService functions
describe('CreatePatientService Tests', () => {
  it('makePatient returns successful', async () => {
  // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockHistory = { push: jest.fn() };
    const mockNewPatient = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      makePatient(mockNewPatient, mockHistory);
    });

    // Assert
    expect(toast.success);
    expect(mockHistory.push).toBeCalled();
  });

  it('makePatient returns unsuccessful', async () => {
    // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockHistory = { push: jest.fn() };
    const mockNewPatient = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      makePatient(mockNewPatient, mockHistory);
    });

    // Assert
    expect(toast.error);
  });
});
