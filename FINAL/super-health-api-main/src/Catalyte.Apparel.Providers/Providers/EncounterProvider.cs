using Catalyte.Apparel.Data.Interfaces;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.Providers.Interfaces;
using Catalyte.Apparel.Utilities.HttpResponseExceptions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Catalyte.Apparel.Providers.Validators;

namespace Catalyte.Apparel.Providers.Providers
{
    /// <summary>
    /// This class provides the implementation of the IEncounterProvider interface, providing service methods for encounters.
    /// </summary>
    public class EncounterProvider : IEncounterProvider
    {
        private readonly ILogger<EncounterProvider> _logger;
        private readonly IEncounterRepository _encounterRepository;
        private readonly IPatientRepository _patientRepository;

        public EncounterProvider(IEncounterRepository encounterRepository, ILogger<EncounterProvider> logger, IPatientRepository patientRepository)
        {
            _logger = logger;
            _encounterRepository = encounterRepository;
            _patientRepository = patientRepository;
        }

        /// <summary>
        /// Asynchronously retrieves all encounters from the database.
        /// </summary>
        /// <param name="patientId">The id of the patient the encounters belong to.</param>
        /// <returns>All encounters in the database with the given patient id.</returns>
        public async Task<IEnumerable<Encounter>> GetEncountersByPatientIdAsync(int patientId)
        {
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

            return encounters;
        }

        /// <summary>
        /// Asynchronously retrieves the encounter with the provided id from the database.
        /// </summary>
        /// <param name="encounterId">The id of the encounter to retrieve.</param>
        /// <returns>The encounter.</returns>
        public async Task<Encounter> GetEncounterByIdAsync(int encounterId)
        {
            Encounter encounter;

            try
            {
                encounter = await _encounterRepository.GetEncounterByIdAsync(encounterId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            if (encounter == null || encounter == default)
            {
                _logger.LogInformation($"Encounter with id: {encounterId} could not be found.");
                throw new NotFoundException($"Encounter with id: {encounterId} could not be found.");
            }

            return encounter;
        }

        /// <summary>
        /// Persists a encounter to the database given the provided email is not already in the database or null.
        /// </summary>
        /// <param name="patientId">The patient id of the patient that the new encounter belongs to.</param>
        /// <param name="newEncounter">The encounter to persist.</param>
        /// <returns>The encounter.</returns>
        public async Task<Encounter> CreateEncounterAsync(int patientId, Encounter newEncounter)
        {
            newEncounter.ValidateEncounter();

            Patient existingPatient;

            try
            {   // Check if patient email already exists in the database under another patient
                existingPatient = await _patientRepository.GetPatientByIdAsync(newEncounter.PatientId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (existingPatient == default)
            {   // If patient does not exist in the database, throw an exception
                _logger.LogError("Encounter patientId does not match any patient in the database.");
                throw new NotFoundException("Encounter patientId does not match any patient in the database.");
            } else if (existingPatient.Id != patientId)
            {   // If patient does not match the patient id provided, throw an exception
                _logger.LogError("Encounter patientId does not match the provided patient's id.");
                throw new ConflictException("Encounter patientId does not match the provided patient's id.");
            }

            Encounter savedEncounter;

            try
            {
                savedEncounter = await _encounterRepository.CreateEncounterAsync(patientId, newEncounter);
                _logger.LogInformation("Encounter saved.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return savedEncounter;
        }

        /// <summary>
        /// Updates an encounter in the database.
        /// </summary>
        /// <param name="encounterId">The id of the encounter being updated.</param>
        /// <param name="editedEncounter">The updated encounter object to persist.</param>
        /// <returns>The updated encounter.</returns>
        public async Task<Encounter> UpdateEncounterAsync(int patientId, int encounterId, Encounter editedEncounter)
        {
            editedEncounter.Id = encounterId;
            editedEncounter.ValidateEncounter();

            Encounter existingEncounter;

            try
            {
                existingEncounter = await _encounterRepository.GetEncounterByIdAsync(encounterId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (existingEncounter == default)
            {   // If the encounter doesn't exist in the database, throw an exception
                _logger.LogError("Encounter does not exist.");
                throw new NotFoundException("Encounter does not exist.");
            }

            Patient existingPatient;

            try
            {   // Check if patient email already exists in the database under another patient
                existingPatient = await _patientRepository.GetPatientByIdAsync(editedEncounter.PatientId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }
            if (existingPatient == default)
            {   // If patient does not exist in the database, throw an exception
                _logger.LogError("Encounter patientId does not match any patient in the database.");
                throw new NotFoundException("Encounter patientId does not match any patient in the database.");
            }
            else if (existingPatient.Id != patientId)
            {   // If patient does not match the patient id provided, throw an exception
                _logger.LogError("Encounter patientId does not match the provided patient's id.");
                throw new ConflictException("Encounter patientId does not match the provided patient's id.");
            }

            Encounter updatedEncounter;

            try
            {
                updatedEncounter = await _encounterRepository.UpdateEncounterAsync(editedEncounter);
                _logger.LogInformation("Encounter updated.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return updatedEncounter;
        }
    }
}
