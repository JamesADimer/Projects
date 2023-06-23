using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.DTOs.Patients;
using Catalyte.Apparel.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Catalyte.Apparel.API.Controllers
{
    /// <summary>
    /// The PatientController exposes endpoints for patient related actions.
    /// </summary>
    [ApiController]
    [Route("/patients")]

    public class PatientController : ControllerBase
    {
        private readonly ILogger<PatientController> _logger;
        private readonly IPatientProvider _patientProvider;
        private readonly IMapper _mapper;

        public PatientController(
            ILogger<PatientController> logger,
            IPatientProvider patientProvider,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _patientProvider = patientProvider;
        }

        /// <summary>
        /// Returns all patients currently in the database.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> GetPatientsAsync()
        {
            _logger.LogInformation("Request received for GetPatientsAsync");

            var patients = await _patientProvider.GetPatientsAsync();
            var patientDTOs = _mapper.Map<IEnumerable<PatientDTO>>(patients);

            return Ok(patientDTOs);
        }

        /// <summary>
        /// Returns a single patient given its id.
        /// </summary>
        [HttpGet("{patientId}")]
        public async Task<ActionResult<PatientDTO>> GetPatientByIdAsync(int patientId)
        {
            _logger.LogInformation($"Request received for GetPatientByIdAsync for id: {patientId}");

            var patient = await _patientProvider.GetPatientByIdAsync(patientId);
            var patientDTO = _mapper.Map<PatientDTO>(patient);

            return Ok(patientDTO);
        }

        /// <summary>
        /// Stores a provided patient to the database given user-defined fields.
        /// </summary>
        /// <param name="patientToCreate"></param>
        /// <returns> 201 Created Response </returns>
        [HttpPost]
        public async Task<ActionResult<PatientDTO>> CreatePatientAsync([FromBody] Patient patientToCreate)
        {
            _logger.LogInformation("Request received for CreatePatientAsync");

            var patient = await _patientProvider.CreatePatientAsync(patientToCreate);
            var patientDTO = _mapper.Map<PatientDTO>(patient);

            return Created("/patients", patientDTO);
        }

        /// <summary>
        /// Update patients given payload
        /// </summary>
        /// <param name="patientId">Patient ID to update</param>
        /// <param name="patientToUpdate">payload with updated patient information</param>
        /// <returns>OK if patient was updated successfully</returns>
        [HttpPut("{patientId}")]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> GetPatientsAsync(int patientId, [FromBody] Patient patientToUpdate)
        {
            _logger.LogInformation("Put Request received for GetPatientsAsync");

            Patient patient = await _patientProvider.UpdatePatientAsync(patientId, patientToUpdate);

            return Ok(patient);
        }

        /// <summary>
        /// Removes patient from database given the patient ID.
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns> 402 No Content response </returns>
        [HttpDelete("{patientId}")]
        public async Task<ActionResult> DeletePatientByIdAsync(int patientId)

        {
            _logger.LogInformation($"Request received for DeletePatientByIdAsync for id: {patientId}");

            await _patientProvider.DeletePatientByIdAsync(patientId);

            return NoContent();
        }
    }
}

