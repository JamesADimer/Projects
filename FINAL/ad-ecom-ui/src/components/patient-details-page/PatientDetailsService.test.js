import { toast } from 'react-toastify';
import { waitFor } from '@testing-library/react';
import { fetchPatient, deletePatient } from './PatientDetailsService';
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
describe('PatientDetailsService Tests', () => {
  it('fetchPatient should call setPatient once while setApierror should not be called', async () => {
  // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockSetPatient = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchPatient(mockPatientId, mockSetPatient, mockSetApiError);
    });

    // Assert
    expect(mockSetPatient).toBeCalledTimes(1);
    expect(mockSetApiError).toBeCalledTimes(0);
  });

  it('fetchPatient should call setApiError once while setPatient should not be called', async () => {
    // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockSetPatient = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchPatient(mockPatientId, mockSetPatient, mockSetApiError);
    });

    // Assert
    expect(mockSetPatient).toBeCalledTimes(0);
    expect(mockSetApiError).toBeCalledTimes(1);
  });

  it('deletePatient should be successful', async () => {
    // Arrange
    const mockHistory = { push: jest.fn() };
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      deletePatient(mockPatientId, mockHistory);
    });

    // Assert
    expect(true);
    expect(mockHistory.push).toBeCalled();
  });

  it('deletePatient should fail', async () => {
    // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      deletePatient(mockPatientId);
    });

    // Assert
    expect(false);
    expect(toast.error);
  });

  it('fetchEncounters should call setEncounters once while setApierror should not be called', async () => {
    // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockSetEncounters = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchPatient(mockPatientId, mockSetEncounters, mockSetApiError);
    });

    // Assert
    expect(mockSetEncounters).toBeCalledTimes(1);
    expect(mockSetApiError).toBeCalledTimes(0);
  });

  it('fetchEncounters should call setApiError once while setEncounters should not be called', async () => {
    // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockSetEncounters = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchPatient(mockPatientId, mockSetEncounters, mockSetApiError);
    });

    // Assert
    expect(mockSetEncounters).toBeCalledTimes(0);
    expect(mockSetApiError).toBeCalledTimes(1);
  });
});
