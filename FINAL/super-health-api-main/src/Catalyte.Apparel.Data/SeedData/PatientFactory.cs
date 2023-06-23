using Catalyte.Apparel.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Catalyte.Apparel.Data.SeedData
{
    /// <summary>
    /// This class provides tools for generating random patients.
    /// </summary>
    public class PatientFactory
    {
        readonly Random _rand = new();

        private readonly List<string> _firstNames = new()
        {
            "Jimmy",
            "John",
            "Jake",
            "Jennifer",
            "Valerie",
            "Joe",
            "Gus",
            "Jose",
            "Anthony",
            "Caleb",
            "Lois",
            "Rick",
            "Vanessa",
            "Angelica ",
            "Jessica"
        };

        private readonly List<string> _lastNames = new()
        {
            "Dimer",
            "Henderson",
            "Jackson",
            "Vega",
            "Sanders",
            "Johnson",
            "Black",
            "White"
        };
        private readonly List<string> _emails = new()
        {
            ".com",
            ".io",
            ".org",
            ".gov"
        };
        private readonly List<string> _insurances = new()
        {
            "Insured",
            "Uninsured",
            "Self-insured"
        };
        private readonly List<string> _genders = new()
        {
            "Male",
            "Female",
            "Other"
        };
        private readonly List<string> _streets = new()
        {
            "123 N Fake Dr",
            "321 E Sesame St",
            "777 W Lucky Blvd",
            "222 S Cool Ct"
        };
        private readonly List<string[]> _cityStates = new()
        {
            new string[] {"Chicago", "IL"},
            new string[] {"Portland", "OR"},
            new string[] {"Boston", "MA"},
            new string[] {"Denver", "CO"},
            new string[] {"Columbia", "SC"},
            new string[] {"Wichita", "KS"}
        };
        private string RandomString(int size)
        {
            var builder = new StringBuilder(size);
            char offset = 'a';
            const int lettersOffset = 26;

            for (var i = 0; i < size; i++)
            {
                var @char = (char)_rand.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }

            return builder.ToString();
        }

        /// <summary>
        /// Generates a number of random patients based on input.
        /// </summary>
        /// <param name="numberOfPatients">The number of random patients to generate.</param>
        /// <returns>A list of random patients.</returns>
        public List<Patient> GenerateRandomPatients(int numberOfPatients)
        {

            var patientList = new List<Patient>();

            for (var i = 0; i < numberOfPatients; i++)
            {
                patientList.Add(CreateRandomPatient(i + 1));
            }

            return patientList;
        }

        /// <summary>
        /// Uses random generators to build a patients.
        /// </summary>
        /// <param name="id">ID to assign to the patient.</param>
        /// <returns>A randomly generated patient.</returns>
        private Patient CreateRandomPatient(int id)
        {
            int cityState = _rand.Next(0, 5);
            return new Patient
            {
                Id = id,
                FirstName = _firstNames[_rand.Next(0, 15)],
                LastName = _lastNames[_rand.Next(0, 7)],
                SSN = (_rand.Next(100, 999).ToString() + "-" + _rand.Next(10, 99).ToString() + "-" + _rand.Next(1000, 9999).ToString()),
                Email = RandomString(_rand.Next(6, 8)) + "@" + RandomString(_rand.Next(6, 8)) + _emails[_rand.Next(0,3)],
                Street = _streets[_rand.Next(0, 3)],
                City = _cityStates[cityState][0],
                State = _cityStates[cityState][1],
                Postal = (_rand.Next(10000, 99999)).ToString(),
                Age = _rand.Next(1, 99),
                Height = _rand.Next(24, 96),
                Weight = _rand.Next(20, 300),
                Insurance = _insurances[_rand.Next(0, 2)],
                Gender = _genders[_rand.Next(0, 2)],
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow
            };
        }
    }
}