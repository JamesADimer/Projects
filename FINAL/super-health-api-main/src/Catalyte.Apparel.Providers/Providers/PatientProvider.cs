using Catalyte.Apparel.Data.Interfaces;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.Providers.Interfaces;
using Catalyte.Apparel.Utilities.HttpResponseExceptions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Catalyte.Apparel.Providers.Validators;
using System.Linq;

namespace Catalyte.Apparel.Providers.Providers
{
    /// <summary>
    /// This class provides the implementation of the IPatientProvider interface, providing service methods for patients.
    /// </summary>
    public class PatientProvider : IPatientProvider
    {
        private readonly ILogger<PatientProvider> _logger;
        private readonly IPatientRepository _patientRepository;
        private readonly IEncounterRepository _encounterRepository;

        public PatientProvider(IPatientRepository patientRepository, ILogger<PatientProvider> logger, IEncounterRepository encounterRepository)
        {
            _logger = logger;
            _patientRepository = patientRepository;
            _encounterRepository = encounterRepository;
        }

        /// <summary>
        /// Asynchronously retrieves all patients from the database.
        /// </summary>
        /// <returns>All patients in the database.</returns>
        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            IEnumerable<Patient> patients;

            try
            {
                patients = await _patientRepository.GetPatientsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return patients;
        }

        /// <summary>
        /// Asynchronously retrieves the patient with the provided id from the database.
        /// </summary>
        /// <param name="patientId">The id of the patient to retrieve.</param>
        /// <returns>The patient.</returns>
        public async Task<Patient> GetPatientByIdAsync(int patientId)
        {
            Patient patient;

            try
            {
                patient = await _patientRepository.GetPatientByIdAsync(patientId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            if (patient == null || patient == default)
            {
                _logger.LogInformation($"Patient with id: {patientId} could not be found.");
                throw new NotFoundException($"Patient with id: {patientId} could not be found.");
            }

            return patient;
        }

        /// <summary>
        /// Persists a patient to the database given the provided email is not already in the database or null.
        /// </summary>
        /// <param name="newPatient">The patient to persist.</param>
        /// <returns>The patient.</returns>
        public async Task<Patient> CreatePatientAsync(Patient newPatient)
        {
            newPatient.ValidatePatient();

            Patient existingPatient;

            try
            {   // Check if patient email already exists in the database under another patient
                existingPatient = await _patientRepository.GetPatientByEmailAsync(newPatient.Email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (existingPatient != default)
            {   // If another patient with that email exists, throw an exception
                _logger.LogError("Patient email already exists.");
                throw new ConflictException("Patient email already exists.");
            }

            Patient savedPatient;

            try
            {
                savedPatient = await _patientRepository.CreatePatientAsync(newPatient);
                _logger.LogInformation("Patient saved.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return savedPatient;
        }

        /// <summary>
        /// Updates an patient in the database.
        /// </summary>
        /// <param name="patientId">The id of the patient being updated.</param>
        /// <param name="editedPatient">The updated patient object to persist.</param>
        /// <returns>The updated patient.</returns>
        public async Task<Patient> UpdatePatientAsync(int patientId, Patient editedPatient)
        {
            editedPatient.Id = patientId;
            editedPatient.ValidatePatient();

            Patient existingPatient;

            try
            {
                existingPatient = await _patientRepository.GetPatientByIdAsync(patientId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (existingPatient == default)
            {   // If the patient doesn't exist in the database, throw an exception
                _logger.LogError("Patient does not exist.");
                throw new NotFoundException("Patient does not exist.");
            }

            try
            {   // Check if patient email already exists in the database under another patient
                existingPatient = await _patientRepository.GetPatientByEmailAsync(editedPatient.Email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (existingPatient != default && existingPatient.Id != patientId)
            {   // If another patient with that email exists, throw an exception
                _logger.LogError("Patient email already exists.");
                throw new ConflictException("Patient email already exists.");
            }

            Patient updatedPatient;

            try
            {
                updatedPatient = await _patientRepository.UpdatePatientAsync(editedPatient);
                _logger.LogInformation("Patient updated.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return updatedPatient;
        }

        /// <summary>
        /// Asynchronously retrieves the patient with the provided id from the database and deletes it.
        /// </summary>
        /// <param name="patientId">The id of the patient to delete.</param>
        /// <returns></returns>
        public async Task DeletePatientByIdAsync(int patientId)
        {
            Patient patient;

            try
            {
                patient = await _patientRepository.GetPatientByIdAsync(patientId);
            }

            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (patient == default)
            {
                _logger.LogInformation($"Patient with id: {patientId} could not be found.");
                throw new NotFoundException($"Patient with id: {patientId} could not be found.");
            }

            IEnumerable<Encounter> encounters;

            try
            {
                encounters = await _encounterRepository.GetEncountersByPatientIdAsync(patientId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (encounters.Any())
            {
                _logger.LogInformation($"Patient with id: {patientId} has encounters associated with it and could not be deleted.");
                throw new ConflictException($"Patient with id: {patientId} has encounters associated with it and could not be deleted.");
            }

            try
            {
                await _patientRepository.DeletePatientByIdAsync(patient);
            }
            catch
            {
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
        }
    }
}
