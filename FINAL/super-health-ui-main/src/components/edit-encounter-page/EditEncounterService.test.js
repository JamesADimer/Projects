import { toast } from 'react-toastify';
import { waitFor } from '@testing-library/react';
import updateEncounter, { fetchEncounter } from './EditEncounterService';
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
describe('EditEncounterService Tests', () => {
  it('fetchEncounter should call setEncounter once while setApierror should not be called', async () => {
  // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockEncounterId = jest.fn();
    const mockSetEncounter = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchEncounter(mockPatientId, mockEncounterId, mockSetEncounter, mockSetApiError);
    });

    // Assert
    expect(mockSetEncounter).toBeCalledTimes(1);
    expect(mockSetApiError).toBeCalledTimes(0);
  });

  it('fetchEncounter should call setApiError once while setPatient should not be called', async () => {
    // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockEncounterId = jest.fn();
    const mockSetEncounter = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchEncounter(mockPatientId, mockEncounterId, mockSetEncounter, mockSetApiError);
    });

    // Assert
    expect(mockSetEncounter).toBeCalledTimes(0);
    expect(mockSetApiError).toBeCalledTimes(1);
  });

  it('updateEncounter should be successful', async () => {
    // Arrange
    const mockHistory = { push: jest.fn() };
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockEncounterId = jest.fn();
    const mockEncounter = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      updateEncounter(mockPatientId, mockEncounterId, mockEncounter, mockHistory);
    });

    // Assert
    expect(true);
    expect(mockHistory.push).toBeCalled();
    expect(toast.success);
  });

  it('updateEncounter should be unsuccessful', async () => {
    // Arrange
    const mockHistory = { push: jest.fn() };
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = false;
    mockResponse.json = () => Promise.resolve('test');

    const mockPatientId = jest.fn();
    const mockEncounterId = jest.fn();
    const mockEncounter = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      updateEncounter(mockPatientId, mockEncounterId, mockEncounter, mockHistory);
    });

    // Assert
    expect(false);
    expect(toast.error);
  });
});
