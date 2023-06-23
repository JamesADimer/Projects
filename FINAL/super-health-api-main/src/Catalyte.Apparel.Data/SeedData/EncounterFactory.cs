using Catalyte.Apparel.Data.Models;
using System;
using System.Collections.Generic;

namespace Catalyte.Apparel.Data.SeedData
{
    /// <summary>
    /// This class provides tools for generating random patients.
    /// </summary>
    public class EncounterFactory
    {
        readonly Random _rand = new();

        private readonly List<string> _notes = new()
        {
            "Regular checkup",
            "Emergency visit",
            "Scheduled appointment"
        };

        private readonly List<string> _visitCodes = new()
        {
            "H7J 8W2",
            "A1B 2C3",
            "H9D 8F6",
            "P4F 7B5"
        };
        private readonly List<string> _providers = new()
        {
            "New Hospital",
            "Old Hospital",
            "Clinic",
            "Urgent Care"
        };
        private readonly List<string> _complaints = new()
        {
            "Leg hurts",
            "Arm hurts",
            "Feeling dizzy"
        };

        /// <summary>
        /// Generates a number of random encounters based on input.
        /// </summary>
        /// <param name="numberOfEncounters">The number of random encounters to generate.</param>
        /// <returns>A list of random encounters.</returns>
        public List<Encounter> GenerateRandomEncounters(int numberOfEncounters)
        {

            var encounterList = new List<Encounter>();

            for (var i = 0; i < numberOfEncounters; i++)
            {
                encounterList.Add(CreateRandomEncounter(i + 1));
            }

            return encounterList;
        }

        /// <summary>
        /// Uses random generators to build an encounter.
        /// </summary>
        /// <param name="id">ID to assign to the encounter.</param>
        /// <returns>A randomly generated encounter.</returns>
        private Encounter CreateRandomEncounter(int id)
        {
            int ascii_index = _rand.Next(65, 91); //ASCII character codes 65-90
            char randomCapitalLetter = Convert.ToChar(ascii_index); //produces any char A-Z
            return new Encounter
            {
                Id = id,
                PatientId = _rand.Next(1, 10),
                Notes = _notes[_rand.Next(0, 2)],
                VisitCode = _visitCodes[_rand.Next(0, 3)],
                Provider = _providers[_rand.Next(0, 3)],
                BillingCode = (_rand.Next(100, 999).ToString() + "." + _rand.Next(100, 999).ToString() + "." + _rand.Next(100, 999).ToString() + "-" + _rand.Next(10, 99).ToString()),
                ICD10 = randomCapitalLetter.ToString() + _rand.Next(10, 99).ToString(),
                TotalCost = (decimal)(_rand.Next(8000, 20000) + Math.Round(new decimal(_rand.NextDouble()) * 1000, 2)),
                Copay = (decimal)(_rand.Next(1000, 2000) + Math.Round(new decimal(_rand.NextDouble()) * 1000, 2)),
                ChiefComplaint = _complaints[_rand.Next(0, 2)],
                Pulse = _rand.Next(60, 100),
                Systolic = _rand.Next(60, 120),
                Diastolic = _rand.Next(40, 80),
                Date = DateTime.UtcNow.AddDays(_rand.Next(-100, 0)).ToString("yyyy-MM-dd"),
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow
            };
        }
    }
}