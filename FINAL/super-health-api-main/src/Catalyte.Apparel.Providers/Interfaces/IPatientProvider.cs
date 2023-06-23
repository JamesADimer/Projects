using Catalyte.Apparel.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalyte.Apparel.Providers.Interfaces
{
    /// <summary>
    /// This interface provides an abstraction layer for patient related service methods.
    /// </summary>
    public interface IPatientProvider
    {
        Task<IEnumerable<Patient>> GetPatientsAsync();

        Task<Patient> GetPatientByIdAsync(int patientId);

        Task<Patient> CreatePatientAsync(Patient patient);

        Task<Patient> UpdatePatientAsync(int patientId, Patient patient);

        Task DeletePatientByIdAsync(int patientId);
    }
}