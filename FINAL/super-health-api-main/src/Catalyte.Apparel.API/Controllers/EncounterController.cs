using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.DTOs.Encounters;
using Catalyte.Apparel.Providers.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Catalyte.Apparel.API.Controllers
{
    /// <summary>
    /// The EncounterController exposes endpoints for patient related actions.
    /// </summary>
    [ApiController]
    [Route("/patients/{patientId}/encounters")]

    public class EncounterController : ControllerBase
    {
        private readonly ILogger<EncounterController> _logger;
        private readonly IEncounterProvider _encounterProvider;
        private readonly IMapper _mapper;

        public EncounterController(
            ILogger<EncounterController> logger,
            IEncounterProvider encounterProvider,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _encounterProvider = encounterProvider;
        }

        /// <summary>
        /// Returns reviews from a specific product given its id.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EncounterDTO>>> GetEncountersByPatientIdAsync(int patientId)
        {
            _logger.LogInformation($"Request received for GetEncountersByPatientIdAsync for ProductId: {patientId}");

            var encounters = await _encounterProvider.GetEncountersByPatientIdAsync(patientId);
            var encounterDTOs = _mapper.Map<IEnumerable<EncounterDTO>>(encounters);

            return Ok(encounterDTOs);
        }

        /// <summary>
        /// Returns a single encounter given its patientId and encounterId.
        /// </summary>
        [HttpGet("{encounterId}")]
        public async Task<ActionResult<EncounterDTO>> GetEncounterByIdAsync(int encounterId)
        {
            _logger.LogInformation($"Request received for GetEncounterByIdAsync for encounterId: {encounterId}");

            var encounter = await _encounterProvider.GetEncounterByIdAsync(encounterId);
            var encounterDTO = _mapper.Map<EncounterDTO>(encounter);

            return Ok(encounterDTO);
        }

        /// <summary>
        /// Stores a provided encounter to the database given user-defined fields.
        /// </summary>
        /// <param name="encounterToCreate"></param>
        /// <returns> 201 Created Response </returns>
        [HttpPost]
        public async Task<ActionResult<EncounterDTO>> CreateEncounterAsync(int patientId, [FromBody] Encounter encounterToCreate)
        {
            _logger.LogInformation("Request received for CreateEncounterAsync");

            var encounter = await _encounterProvider.CreateEncounterAsync(patientId, encounterToCreate);
            var encounterDTO = _mapper.Map<EncounterDTO>(encounter);

            return Created("/patients/{patientId}/encounters", encounterDTO);
        }
        
        /// <summary>
        /// Update encounter given payload
        /// </summary>
        /// <param name="encounterId">Encounter ID to update</param>
        /// <param name="encounterToUpdate">payload with updated encounter information</param>
        /// <returns>OK if encounter was updated successfully</returns>
        [HttpPut("{encounterId}")]
        public async Task<ActionResult<IEnumerable<EncounterDTO>>> GetEncountersAsync(int patientId, int encounterId, [FromBody] Encounter encounterToUpdate)
        {
            _logger.LogInformation("Put Request received for UpdateEncounterAsync");

            Encounter encounter = await _encounterProvider.UpdateEncounterAsync(patientId, encounterId, encounterToUpdate);

            return Ok(encounter);
        }
    }
}

