import { toast } from 'react-toastify';
import { waitFor } from '@testing-library/react';
import makeEncounter from './CreateEncounterService';
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

// test suite for CreateEncounterService functions
describe('CreateEncounterService Tests', () => {
  it('makeEncounter returns successful', async () => {
  // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockHistory = { push: jest.fn() };
    const mockNewEncounter = jest.fn();
    const mockPatientId = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      makeEncounter(mockPatientId, mockNewEncounter, mockHistory);
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
    const mockPatientId = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      makeEncounter(mockPatientId, mockNewPatient, mockHistory);
    });

    // Assert
    expect(toast.error);
  });
});
