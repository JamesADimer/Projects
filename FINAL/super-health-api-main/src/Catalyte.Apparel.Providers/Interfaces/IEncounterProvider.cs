using Catalyte.Apparel.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalyte.Apparel.Providers.Interfaces
{
    /// <summary>
    /// This interface provides an abstraction layer for encounter related service methods.
    /// </summary>
    public interface IEncounterProvider
    {
        Task<IEnumerable<Encounter>> GetEncountersByPatientIdAsync(int patientId);

        Task<Encounter> GetEncounterByIdAsync(int encounterId);

        Task<Encounter> CreateEncounterAsync(int patientId, Encounter encounter);

        Task<Encounter> UpdateEncounterAsync(int patientId, int encounterId, Encounter encounter);
    }
}