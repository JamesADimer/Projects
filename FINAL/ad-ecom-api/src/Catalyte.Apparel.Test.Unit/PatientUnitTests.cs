using Catalyte.Apparel.Providers.Validators;
using Catalyte.Apparel.Data.Interfaces;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.Providers.Interfaces;
using Catalyte.Apparel.Providers.Providers;
using Catalyte.Apparel.Utilities.HttpResponseExceptions;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Catalyte.Apparel.Test.Unit
{
    public class PatientUnitTests
    {
        private readonly List<Patient> patients;
        private readonly List<Encounter> encounters;
        private readonly IPatientProvider patientProvider;
        private readonly Mock<IPatientRepository> patientRepo;
        private readonly Mock<IEncounterRepository> encounterRepo;
        private readonly Mock<ILogger<PatientProvider>> logger;

        public PatientUnitTests()
        {
            patientRepo = new Mock<IPatientRepository>();
            encounterRepo = new Mock<IEncounterRepository>();
            logger = new Mock<ILogger<PatientProvider>>();
            patientProvider = new PatientProvider(patientRepo.Object, logger.Object, encounterRepo.Object);
            patients = new List<Patient>()
            {
                new Patient()
                {
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
            encounters = new List<Encounter>()
            {
                new Encounter()
                {
                    Id = 1,
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
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
                }
            };
        }

        [Fact]
        public async void GetPatients_ServiceUnavailable_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientsAsync()).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.GetPatientsAsync());
        }

        [Fact]
        public async void GetPatints_ValidRequest_Returns200()
        {
            patientRepo.Setup(p => p.GetPatientsAsync()).ReturnsAsync(patients);

            var actual = await patientProvider.GetPatientsAsync();

            Assert.NotNull(actual);
            Assert.IsType<List<Patient>>(actual);
        }

        [Fact]
        public async void GetPatientById_NotFound_Returns404()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync((int patientId) =>
            {
                return null;
            });

            await Assert.ThrowsAsync<NotFoundException>(() => patientProvider.GetPatientByIdAsync(1));

            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync((int patientId) =>
            {
                return default;
            });

            await Assert.ThrowsAsync<NotFoundException>(() => patientProvider.GetPatientByIdAsync(1));
        }

        [Fact]
        public async void GetPatientById_ServiceUnavailable_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.GetPatientByIdAsync(1));
        }

        [Fact]
        public async void GetPatientByID_ValidRequest_Returns200()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            var actual = await patientProvider.GetPatientByIdAsync(patients[0].Id);

            Assert.NotNull(actual);
            Assert.IsType<Patient>(actual);
        }
        
        [Fact]
        public async void CreatePatient_ValidPatient_Returns201()
        {
            patientRepo.Setup(p => p.CreatePatientAsync(It.IsAny<Patient>())).ReturnsAsync((Patient target) =>
            {
                // ensures id is set to be the next one in list
                target.Id = patients.Count + 1;

                // adds current patient to list
                patients.Add(target);

                // return updated patient
                return target;
            });

            var patient = new Patient()
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
                Postal = "12345",
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow
            };

            var actual = await patientProvider.CreatePatientAsync(patient);

            Assert.NotNull(actual);
            Assert.IsType<Patient>(actual);
            Assert.Equal(patients.Count, actual.Id);
        }

        [Fact]
        public async void CreatePatient_DuplicatePatientEmail_Returns409()
        {
            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<ConflictException>(() => patientProvider.CreatePatientAsync(patients[0]));
        }

        [Fact]
        public async void CreatePatient_ServiceUnavailableOnEmailRequest_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.CreatePatientAsync(patients[0]));
        }

        [Fact]
        public async void CreatePatient_ServiceUnavailable_Returns503()
        {
            patientRepo.Setup(p => p.CreatePatientAsync(It.IsAny<Patient>())).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.CreatePatientAsync(patients[0]));
        }
        
        [Fact]
        public void ValidatePatient_InvalidFirstName_Returns400()
        {
            Patient patient = patients[0];
            patient.FirstName = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("First name is required", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidLastName_Returns400()
        {
            Patient patient = patients[0];
            patient.LastName = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Last name is required", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidSSN_Returns400()
        {
            Patient patient = patients[0];
            patient.SSN = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Social security number (SSN) is required", actual.Value.ErrorMessage);

            patient.SSN = "123121234";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("SSN must follow the following format: 123-12-1234", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidEmail_Returns400()
        {
            Patient patient = patients[0];
            patient.Email = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Email is required", actual.Value.ErrorMessage);

            patient.Email = "invalidemail";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Email must follow the following format: username@domain.com", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidAge_Returns400()
        {
            Patient patient = patients[0];
            patient.Age = 0;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Age is required", actual.Value.ErrorMessage);

            patient.Age = -12;

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Age must be a positive whole number", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidHeight_Returns400()
        {
            Patient patient = patients[0];
            patient.Height = 0;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Height is required", actual.Value.ErrorMessage);

            patient.Height = -12;

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Height must be a positive whole number", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidWeight_Returns400()
        {
            Patient patient = patients[0];
            patient.Weight = 0;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Weight is required", actual.Value.ErrorMessage);

            patient.Weight = -12;

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Weight must be a positive whole number", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidInsurance_Returns400()
        {
            Patient patient = patients[0];
            patient.Insurance = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Insurance is required", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidGender_Returns400()
        {
            Patient patient = patients[0];
            patient.Gender = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Gender is required", actual.Value.ErrorMessage);

            patient.Gender = "Non-binary";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Gender must be Male, Female, or Other", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidStreet_Returns400()
        {
            Patient patient = patients[0];
            patient.Street = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Street is required", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidCity_Returns400()
        {
            Patient patient = patients[0];
            patient.City = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("City is required", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidState_Returns400()
        {
            Patient patient = patients[0];
            patient.State = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("State is required", actual.Value.ErrorMessage);

            patient.State = "Illinois";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("State must be a valid two letter abbreviation", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidatePatient_InvalidPostal_Returns400()
        {
            Patient patient = patients[0];
            patient.Postal = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Postal code is required", actual.Value.ErrorMessage);

            patient.Postal = "123451234";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidatePatient(patient));

            Assert.Equal("Postal code must follow the following format: 12345 or 12345-1234", actual2.Value.ErrorMessage);
        }

        [Fact]
        public async void UpdatePatient_ValidPatient_Returns200()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ReturnsAsync(patients[0]);

            Patient patient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
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

            patientRepo.Setup(p => p.UpdatePatientAsync(patient)).ReturnsAsync(patients[0]);

            var actual = await patientProvider.UpdatePatientAsync(patients[0].Id, patient);

            Assert.NotNull(actual);
            Assert.IsType<Patient>(actual);
            Assert.Equal(patients.Count, actual.Id);
        }

        [Fact]
        public async void UpdatePatient_ServiceUnavailable_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ReturnsAsync(patients[0]);

            Patient patient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
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

            patientRepo.Setup(p => p.UpdatePatientAsync(patient)).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.UpdatePatientAsync(patients[0].Id, patient));
        }

        [Fact]
        public async void UpdatePatient_ServiceUnavailableOnGetPatientById_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("test message"));

            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ReturnsAsync(patients[0]);

            Patient patient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
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

            patientRepo.Setup(p => p.UpdatePatientAsync(patient)).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.UpdatePatientAsync(patients[0].Id, patient));
        }

        [Fact]
        public async void UpdatePatient_ServiceUnavailableOnGetPatientByEmail_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ThrowsAsync(new Exception("test message"));

            Patient patient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
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

            patientRepo.Setup(p => p.UpdatePatientAsync(patient)).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.UpdatePatientAsync(patients[0].Id, patient));
        }

        [Fact]
        public async void UpdatePatient_PatientDoesNotExist_Returns404()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(200)).ReturnsAsync(patients[0]);

            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ReturnsAsync(patients[0]);

            Patient patient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
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

            patientRepo.Setup(p => p.UpdatePatientAsync(patient)).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<NotFoundException>(() => patientProvider.UpdatePatientAsync(patients[0].Id, patient));
        }

        [Fact]
        public async void UpdatePatient_PatientEmailConflict_Returns409()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            Patient newpatient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
                Email = "blah@blah.com",
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
            patients.Add(newpatient);

            patientRepo.Setup(p => p.GetPatientByEmailAsync(It.IsAny<string>())).ReturnsAsync(patients[1]);

            Patient patient = new()
            {
                FirstName = "John",
                LastName = "Doe",
                SSN = "111-11-1111",
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

            patientRepo.Setup(p => p.UpdatePatientAsync(patient)).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<ConflictException>(() => patientProvider.UpdatePatientAsync(patients[0].Id, patient));
        }

        [Fact]
        public async void DeletePatient_SuccessfulDelete_Returns204()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            encounterRepo.Setup(p => p.GetEncountersByPatientIdAsync(It.IsAny<int>())).ReturnsAsync(new List<Encounter>());

            patientRepo.Setup(p => p.DeletePatientByIdAsync(patients[0]));

            await patientProvider.DeletePatientByIdAsync(patients[0].Id);

            patientRepo.Verify(p => p.DeletePatientByIdAsync(patients[0]), Times.Once());
        }

        [Fact]
        public async void DeletePatient_ServiceUnavailable_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            encounterRepo.Setup(p => p.GetEncountersByPatientIdAsync(It.IsAny<int>())).ReturnsAsync(new List<Encounter>());

            patientRepo.Setup(p => p.DeletePatientByIdAsync(patients[0])).ThrowsAsync(new Exception("error message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.DeletePatientByIdAsync(patients[0].Id));
        }

        [Fact]
        public async void DeletePatient_ServiceUnavailableOnGetPatientById_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("error message"));

            encounterRepo.Setup(p => p.GetEncountersByPatientIdAsync(It.IsAny<int>())).ReturnsAsync(new List<Encounter>());

            patientRepo.Setup(p => p.DeletePatientByIdAsync(patients[0]));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.DeletePatientByIdAsync(patients[0].Id));
        }

        [Fact]
        public async void DeletePatient_ServiceUnavailableOnGetEncountersByPatientId_Returns503()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            encounterRepo.Setup(p => p.GetEncountersByPatientIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("error message"));

            patientRepo.Setup(p => p.DeletePatientByIdAsync(patients[0]));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => patientProvider.DeletePatientByIdAsync(patients[0].Id));
        }

        [Fact]
        public async void DeletePatient_PatientNotFound_Returns404()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(200)).ReturnsAsync(patients[0]);

            encounterRepo.Setup(p => p.GetEncountersByPatientIdAsync(It.IsAny<int>())).ReturnsAsync(new List<Encounter>());

            patientRepo.Setup(p => p.DeletePatientByIdAsync(patients[0]));

            await Assert.ThrowsAsync<NotFoundException>(() => patientProvider.DeletePatientByIdAsync(patients[0].Id));
        }

        [Fact]
        public async void DeletePatient_HasEncounters_Returns409()
        {
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ReturnsAsync(patients[0]);

            encounterRepo.Setup(p => p.GetEncountersByPatientIdAsync(It.IsAny<int>())).ReturnsAsync(encounters);

            patientRepo.Setup(p => p.DeletePatientByIdAsync(patients[0]));

            await Assert.ThrowsAsync<ConflictException>(() => patientProvider.DeletePatientByIdAsync(patients[0].Id));
        }
    }
}
