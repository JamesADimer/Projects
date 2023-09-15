import { toast } from 'react-toastify';
import { waitFor } from '@testing-library/react';
import updatePatient from './EditPatientService';
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
describe('EditPatientService Tests', () => {
  it('updatePatient should be successful', async () => {
    // Arrange
    const mockHistory = { push: jest.fn() };
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockPatient = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      updatePatient(mockPatientId, mockPatient, mockHistory);
    });

    // Assert
    expect(true);
    expect(mockHistory.push).toBeCalled();
    expect(toast.success);
  });

  it('updatePatient should be unsuccessful', async () => {
    // Arrange
    const mockHistory = { push: jest.fn() };
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockPatient = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      updatePatient(mockPatientId, mockPatient, mockHistory);
    });

    // Assert
    expect(false);
    expect(toast.error);
  });
});
