import { waitFor } from '@testing-library/react';
import fetchPatients from './PatientsPageService';
import HttpHelper from '../../utils/HttpHelper';

// mock httpHelper
jest.mock('../../utils/HttpHelper');

// mocks the router dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/'
  })
}));

// test suite for fetchPatients
describe('PatientsPageService fetchPatients Tests', () => {
  it('setPatients should be called once while setApierror should not be called', async () => {
  // Arrange
    const mockResponse = new Response(); // creates a mock response
    mockResponse.ok = true;
    mockResponse.json = () => Promise.resolve('test');

    const mockSetPatients = jest.fn();
    const mockSetApiError = jest.fn();

    HttpHelper.mockResolvedValue(mockResponse);

    // Act
    await waitFor(() => {
      fetchPatients(mockSetPatients, mockSetApiError);
    });

    // Assert
    expect(mockSetPatients).toBeCalledTimes(1);
    expect(mockSetApiError).toBeCalledTimes(0);
  });
});
