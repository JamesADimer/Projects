using Catalyte.Apparel.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalyte.Apparel.Data.Interfaces
{
    /// <summary>
    /// This interface provides an abstraction layer for patient repository methods.
    /// </summary>
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetPatientsAsync();

        Task<Patient> GetPatientByIdAsync(int patientId);

        Task<Patient> GetPatientByEmailAsync(string patientEmail);

        Task<Patient> CreatePatientAsync(Patient patient);

        Task<Patient> UpdatePatientAsync(Patient patient);

        Task DeletePatientByIdAsync(Patient patient);
    }
}