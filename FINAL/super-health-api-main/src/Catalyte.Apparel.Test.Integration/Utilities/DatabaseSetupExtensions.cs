using Catalyte.Apparel.Data.Context;
using Catalyte.Apparel.Data.SeedData;

namespace Catalyte.Apparel.Test.Integration.Utilities
{
    public static class DatabaseSetupExtensions
    {
        public static void InitializeDatabaseForTests(this ApparelCtx context)
        {
            var patientFactory = new PatientFactory();
            var encounterFactory = new EncounterFactory();
            var patients = patientFactory.GenerateRandomPatients(11);
            var encounters = encounterFactory.GenerateRandomEncounters(20);

            context.Patients.AddRange(patients);
            context.Encounters.AddRange(encounters);
            context.SaveChanges();
        }

        public static void ReinitializeDatabaseForTests(this ApparelCtx context)
        {
            context.Patients.RemoveRange(context.Patients);
            context.Encounters.RemoveRange(context.Encounters);
            context.InitializeDatabaseForTests();
        }
    }
}
