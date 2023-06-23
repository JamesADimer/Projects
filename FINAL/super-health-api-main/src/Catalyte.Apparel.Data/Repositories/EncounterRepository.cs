using Catalyte.Apparel.Data.Context;
using Catalyte.Apparel.Data.Filters;
using Catalyte.Apparel.Data.Interfaces;
using Catalyte.Apparel.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalyte.Apparel.Data.Repositories
{
    /// <summary>
    /// This class handles methods for making requests to the patient repository.
    /// </summary>
    public class EncounterRepository : IEncounterRepository
    {
        private readonly IApparelCtx _ctx;

        public EncounterRepository(IApparelCtx ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// This query retrieves all encounters from the database with a given patient id and returns them.
        /// </summary>
        /// <param name="patientId">An integer matching the id of a patient in the database.</param>
        /// <returns>The encounter with the patient id matching the integer parameter.</returns>
        public async Task<IEnumerable<Encounter>> GetEncountersByPatientIdAsync(int patientId)
        {
            return await _ctx.Encounters
                .AsNoTracking()
                .WhereEncounterPatientIdEquals(patientId)
                .OrderBy(e => e.Id)
                .ToListAsync();
        }

        /// <summary>
        /// This query searches the database for a encounter matching the given id and returns it.
        /// </summary>
        /// <param name="encounterId">An integer matching the id of a encounter in the database.</param>
        /// <returns>The encounter with the id matching the integer parameter.</returns>
        public async Task<Encounter> GetEncounterByIdAsync(int encounterId)
        {
            return await _ctx.Encounters
                .AsNoTracking()
                .WhereEncounterIdEquals(encounterId)
                .SingleOrDefaultAsync();
        }

        /// <summary>
        /// Given a patient id and encounter object, this query adds it to the database.
        /// </summary>
        /// <param name="patientId">An integerthat represents the id of a patient object.</param>
        /// <param name="encounter">An encounter object with all required fields filled out.</param>
        /// <returns>The created encounter object</returns>
        public async Task<Encounter> CreateEncounterAsync(int patientId, Encounter encounter)
        {
            await _ctx.Encounters.AddAsync(encounter);
            await _ctx.SaveChangesAsync();

            return encounter;
        }

        /// <summary>
        /// Given an encounter id and encounter object, this query updates it in the database.
        /// </summary>
        /// <param name="encounter"></param>
        /// <returns>Edited encounter to controller</returns>
        public async Task<Encounter> UpdateEncounterAsync(Encounter encounter)
        {
            _ctx.Encounters.Update(encounter);
            await _ctx.SaveChangesAsync();

            return encounter;
        }
    }
}