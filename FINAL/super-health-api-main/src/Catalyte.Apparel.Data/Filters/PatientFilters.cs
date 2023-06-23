using Catalyte.Apparel.Data.Models;
using System.Linq;

namespace Catalyte.Apparel.Data.Filters
{
    /// <summary>
    /// Filter collection for patient context queries.
    /// </summary>
    public static class PatientFilters
    {
        /// <summary>
        /// This query filters patient by its id.
        /// </summary>
        public static IQueryable<Patient> WherePatientIdEquals(this IQueryable<Patient> patients, int patientId)
        {
            return patients.Where(p => p.Id == patientId).AsQueryable();
        }

        /// <summary>
        /// This query filters patient by its email.
        /// </summary>
        public static IQueryable<Patient> WherePatientEmailEquals(this IQueryable<Patient> patients, string email)
        {
            return patients.Where(p => p.Email == email).AsQueryable();
        }
    }
}
