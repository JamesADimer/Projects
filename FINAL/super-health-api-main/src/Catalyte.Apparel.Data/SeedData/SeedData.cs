using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.Data.SeedData;
using Microsoft.EntityFrameworkCore;
using System;

namespace Catalyte.Apparel.Data.Context
{
    public static class Extensions
    {
        /// <summary>
        /// Produces a set of seed data to insert into the database on startup.
        /// </summary>
        /// <param name="modelBuilder">Used to build model base DbContext.</param>
        public static void SeedData(this ModelBuilder modelBuilder)
        {
            var patientFactory = new PatientFactory();
            var encounterFactory = new EncounterFactory();

            modelBuilder.Entity<Patient>().HasData(patientFactory.GenerateRandomPatients(10));

            var patient = new Patient()
            {
                Id = 11,
                FirstName = "Jimmy",
                LastName = "Dimer",
                SSN = "123-12-1234",
                Email = "jdimer@catalyte.com",
                Age = 25,
                Height = 65,
                Weight = 200,
                Insurance = "Uninsured",
                Gender = "Male",
                Street = "123 Sesame St",
                City = "Chicago",
                State = "IL",
                Postal = "12345"
            };

            modelBuilder.Entity<Patient>().HasData(patient);

            modelBuilder.Entity<Encounter>().HasData(encounterFactory.GenerateRandomEncounters(20));

            var encounter = new Encounter()
            {
                Id = 21,
                PatientId = 1,
                Notes = "",
                VisitCode = "B1B 1B1",
                Provider = "Clinic",
                BillingCode = "123.123.123-12",
                ICD10 = "A11",
                TotalCost = 1500.99M,
                Copay = 200.99M,
                ChiefComplaint = "Headache",
                Pulse = 100,
                Systolic = 80,
                Diastolic = 80,
                Date = "2021-11-24"
            };

            modelBuilder.Entity<Encounter>().HasData(encounter);
        }
    }
}
