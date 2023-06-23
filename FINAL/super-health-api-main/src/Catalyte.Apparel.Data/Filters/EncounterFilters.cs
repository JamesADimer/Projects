using Catalyte.Apparel.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Catalyte.Apparel.Data.Filters
{
    /// <summary>
    /// Filter collection for encounter context queries.
    /// </summary>
    public static class EncounterFilters
    {
        /// <summary>
        /// This query filters encounter by its id.
        /// </summary>
        public static IQueryable<Encounter> WhereEncounterIdEquals(this IQueryable<Encounter> encounters, int encounterId)
        {
            return encounters.Where(e => e.Id == encounterId).AsQueryable();
        }

        /// <summary>
        /// This query filters encounter by its patient id.
        /// </summary>
        public static IQueryable<Encounter> WhereEncounterPatientIdEquals(this IQueryable<Encounter> encounter, int patientId)
        {
            return encounter.Where(e => e.PatientId == patientId).AsQueryable();
        }
    }
}
