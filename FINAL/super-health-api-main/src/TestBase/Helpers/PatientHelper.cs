using Catalyte.Apparel.Data.Models;
using System.Collections.Generic;

namespace Catalyte.Apparel.TestBase.Helpers
{
    public class PatientHelper
    {

        public static Patient GenerateValidPatient()
        {
            return new Patient()
            {
                FirstName = "Jimmy",
                LastName = "Dimer",
                SSN = "123-12-1234",
                Email = "jdimer@catalyte.io",
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
        }

        public static Patient GenerateInvalidPatients(int p)
        {
            List<Patient> patients = new()
            {
                new Patient()
                {   // Missing firstname
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing lastname
                    FirstName = "Jimmy",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing SSN
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing email
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing age
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing height
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing weight
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing insurance
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing gender
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing street
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing city
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing state
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    Postal = "12345"
                },
                new Patient()
                {   // Missing postal
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL"
                },
                new Patient()
                {   // Invalid SSN
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123121234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid email
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "invalid email",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid age
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = -25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid height
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = -65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid weight
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = -200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid gender
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Non-binary",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid state
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "Illinois",
                    Postal = "12345"
                },
                new Patient()
                {   // Invalid postal
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "123"
                },
                new Patient()
                {   // Email conflict
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
                },
                new Patient()
                {   // Id conflict
                    Id = 1,
                    FirstName = "Jimmy",
                    LastName = "Dimer",
                    SSN = "123-12-1234",
                    Email = "jdimer@catalyte.io",
                    Age = 25,
                    Height = 65,
                    Weight = 200,
                    Insurance = "Uninsured",
                    Gender = "Male",
                    Street = "123 Sesame St",
                    City = "Chicago",
                    State = "IL",
                    Postal = "12345"
                }
            };
            return patients[p];
        }
    }
}
