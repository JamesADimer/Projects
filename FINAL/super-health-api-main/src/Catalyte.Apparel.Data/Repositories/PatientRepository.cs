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
    public class PatientRepository : IPatientRepository
    {
        private readonly IApparelCtx _ctx;

        public PatientRepository(IApparelCtx ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// This query retrieves all patients from the database and returns them.
        /// </summary>
        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            return await _ctx.Patients
                .AsNoTracking()
                .OrderBy(p => p.Id)
                .ToListAsync();
        }

        /// <summary>
        /// This query searches the database for a patient matching the given id and returns it.
        /// </summary>
        /// <param name="patientId">An integer matching the id of a patient in the database.</param>
        /// <returns>The patient with the id matching the integer parameter.</returns>
        public async Task<Patient> GetPatientByIdAsync(int patientId)
        {
            return await _ctx.Patients
                .AsNoTracking()
                .WherePatientIdEquals(patientId)
                .SingleOrDefaultAsync();
        }

        /// <summary>
        /// This query searches the database for a patient matching the given email and returns it.
        /// </summary>
        /// <param name="patientEmail">A string matching the email of a patient in the database.</param>
        /// <returns>The patient with the email matching the string parameter.</returns>
        public async Task<Patient> GetPatientByEmailAsync(string patientEmail)
        {
            return await _ctx.Patients
                .AsNoTracking()
                .WherePatientEmailEquals(patientEmail)
                .SingleOrDefaultAsync();
        }

        /// <summary>
        /// Given a new patient object, this query adds it to the database.
        /// </summary>
        /// <param name="patient">A patient object with all required fields filled out.</param>
        /// <returns></returns>
        public async Task<Patient> CreatePatientAsync(Patient patient)
        {
            await _ctx.Patients.AddAsync(patient);
            await _ctx.SaveChangesAsync();

            return patient;
        }

        /// <summary>
        /// Given a patient id and patient object, this query updates it in the database.
        /// </summary>
        /// <param name="patient">A patient object with all required fields filled out.</param>
        /// <returns>Edited patient to controller</returns>
        public async Task<Patient> UpdatePatientAsync(Patient patient)
        {
            _ctx.Patients.Update(patient);
            await _ctx.SaveChangesAsync();

            return patient;
        }

        /// <summary>
        /// Given a patient id, this query deletes it in the database.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public async Task DeletePatientByIdAsync(Patient patient)
        {
            _ctx.Patients.Remove(patient);
            await _ctx.SaveChangesAsync();
        }
    }
}