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
    public class EncounterUnitTests
    {
        private readonly List<Patient> patients;
        private readonly List<Encounter> encounters;
        private readonly IEncounterProvider encounterProvider;
        private readonly Mock<IPatientRepository> patientRepo;
        private readonly Mock<IEncounterRepository> encounterRepo;
        private readonly Mock<ILogger<EncounterProvider>> logger;

        public EncounterUnitTests()
        {
            patientRepo = new Mock<IPatientRepository>();
            encounterRepo = new Mock<IEncounterRepository>();
            logger = new Mock<ILogger<EncounterProvider>>();
            encounterProvider = new EncounterProvider(encounterRepo.Object, logger.Object, patientRepo.Object);
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
        public async void GetEncountersByPatientId_ServiceUnavailable_Returns503()
        {
            encounterRepo.Setup(e => e.GetEncountersByPatientIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.GetEncountersByPatientIdAsync(1));
        }

        [Fact]
        public async void GetEncountersByPatient_ValidRequest_Returns200()
        {
            encounterRepo.Setup(e => e.GetEncountersByPatientIdAsync(It.IsAny<int>())).ReturnsAsync(encounters);

            var actual = await encounterProvider.GetEncountersByPatientIdAsync(1);

            Assert.NotNull(actual);
            Assert.IsType<List<Encounter>>(actual);
        }

        [Fact]
        public async void GetEncounterById_NotFound_Returns404()
        {
            encounterRepo.Setup(e => e.GetEncounterByIdAsync(It.IsAny<int>())).ReturnsAsync((int encounterId) =>
            {
                return null;
            });

            await Assert.ThrowsAsync<NotFoundException>(() => encounterProvider.GetEncounterByIdAsync(1));

            encounterRepo.Setup(p => p.GetEncounterByIdAsync(It.IsAny<int>())).ReturnsAsync((int encounter) =>
            {
                return default;
            });

            await Assert.ThrowsAsync<NotFoundException>(() => encounterProvider.GetEncounterByIdAsync(1));
        }

        [Fact]
        public async void GetEncounterById_ServiceUnavailable_Returns503()
        {
            encounterRepo.Setup(e => e.GetEncounterByIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.GetEncounterByIdAsync(1));
        }

        [Fact]
        public async void GetEncounterByID_ValidRequest_Returns200()
        {
            encounterRepo.Setup(e => e.GetEncounterByIdAsync(It.IsAny<int>())).ReturnsAsync(encounters[0]);

            var actual = await encounterProvider.GetEncounterByIdAsync(encounters[0].Id);

            Assert.NotNull(actual);
            Assert.IsType<Encounter>(actual);
        }
        
        [Fact]
        public async void CreateEncounter_ValidEncounter_Returns201()
        {
            encounterRepo.Setup(p => p.CreateEncounterAsync(It.IsAny<int>(), It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(encounters[0].PatientId)).ReturnsAsync(patients[0]);

            var actual = await encounterProvider.CreateEncounterAsync(patients[0].Id, encounters[0]);

            Assert.NotNull(actual);
            Assert.IsType<Encounter>(actual);
            Assert.Equal(encounters.Count, actual.Id);
        }
        
        [Fact]
        public async void CreateEncounter_ServiceUnavailableOnGetPatient_Returns503()
        {
            encounterRepo.Setup(e => e.CreateEncounterAsync(It.IsAny<int>(), It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(encounters[0].PatientId)).ThrowsAsync(new Exception("test message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.CreateEncounterAsync(patients[0].Id, encounters[0]));
        }

        [Fact]
        public async void CreateEncounter_PatientNotFound_Returns404()
        {
            encounterRepo.Setup(e => e.CreateEncounterAsync(It.IsAny<int>(), It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(200)).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<NotFoundException>(() => encounterProvider.CreateEncounterAsync(patients[0].Id, encounters[0]));
        }

        [Fact]
        public async void CreateEncounter_PatientConflict_Returns409()
        {
            encounterRepo.Setup(e => e.CreateEncounterAsync(It.IsAny<int>(), It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);
            
            Patient patient = new()
            {
                Id = 2,
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
            patients.Add(patient);

            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[0].Id)).ReturnsAsync(patients[0]);

            await Assert.ThrowsAsync<ConflictException>(() => encounterProvider.CreateEncounterAsync(patients[1].Id, encounters[0]));
        }

        [Fact]
        public async void CreateEncounter_ServiceUnavailable_Returns503()
        {
            encounterRepo.Setup(p => p.CreateEncounterAsync(It.IsAny<int>(), It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(encounters[0].PatientId)).ReturnsAsync(patients[0]);
            encounterRepo.Setup(p => p.CreateEncounterAsync(It.IsAny<int>(), It.IsAny<Encounter>())).ThrowsAsync(new Exception("error message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.CreateEncounterAsync(patients[0].Id, encounters[0]));
        }

        [Fact]
        public async void UpdateEncounter_ValidEncounter_Returns200()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(encounters[0].Id)).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[0].Id)).ReturnsAsync(patients[0]);
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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

            var actual = await encounterProvider.UpdateEncounterAsync(patients[0].Id, encounters[0].Id, encounter);

            Assert.NotNull(actual);
            Assert.IsType<Encounter>(actual);
            Assert.Equal(encounters.Count, actual.Id);
        }
        
        [Fact]
        public async void UpdateEncounter_ServiceUnavailableOnGetEncounter_Returns503()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("error message"));
            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[0].Id)).ReturnsAsync(patients[0]);
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.UpdateEncounterAsync(patients[0].Id, encounters[0].Id, encounters[0]));
        }

        [Fact]
        public async void UpdateEncounter_NotFoundOnGetEncounter_Returns404()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(200)).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[0].Id)).ReturnsAsync(patients[0]);
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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

            await Assert.ThrowsAsync<NotFoundException>(() => encounterProvider.UpdateEncounterAsync(patients[0].Id, encounters[0].Id, encounters[0]));
        }

        [Fact]
        public async void UpdateEncounter_ServiceUnavailableOnGetPatient_Returns503()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(It.IsAny<int>())).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(It.IsAny<int>())).ThrowsAsync(new Exception("error message"));
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.UpdateEncounterAsync(patients[0].Id, encounters[0].Id, encounters[0]));
        }

        [Fact]
        public async void UpdateEncounter_PatientConflict_Returns409()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(encounters[0].Id)).ReturnsAsync(encounters[0]);

            Patient patient = new()
            {
                Id = 2,
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
            patients.Add(patient);

            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[0].Id)).ReturnsAsync(patients[0]);
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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

            await Assert.ThrowsAsync<ConflictException>(() => encounterProvider.UpdateEncounterAsync(patients[1].Id, encounters[0].Id, encounters[0]));
        }

        [Fact]
        public async void UpdateEncounter_PatientNotFound_Returns404()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(encounters[0].Id)).ReturnsAsync(encounters[0]);

            Patient patient = new()
            {
                Id = 2,
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
            patients.Add(patient);


            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[1].Id)).ReturnsAsync(patients[1]);
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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

            await Assert.ThrowsAsync<NotFoundException>(() => encounterProvider.UpdateEncounterAsync(patients[0].Id, encounters[0].Id, encounters[0]));
        }

        [Fact]
        public async void UpdateEncounter_ServiceUnavailable_Returns503()
        {
            encounterRepo.Setup(p => p.GetEncounterByIdAsync(encounters[0].Id)).ReturnsAsync(encounters[0]);
            patientRepo.Setup(p => p.GetPatientByIdAsync(patients[0].Id)).ReturnsAsync(patients[0]);
            encounterRepo.Setup(p => p.UpdateEncounterAsync(It.IsAny<Encounter>())).ReturnsAsync(encounters[0]);

            Encounter encounter = new()
            {
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
            encounterRepo.Setup(p => p.UpdateEncounterAsync(encounter)).ThrowsAsync(new Exception("error message"));

            await Assert.ThrowsAsync<ServiceUnavailableException>(() => encounterProvider.UpdateEncounterAsync(patients[0].Id, encounters[0].Id, encounter));
        }

        [Fact]
        public void ValidateEncounter_InvalidTotalCost_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.TotalCost = 0;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Total cost is required", actual.Value.ErrorMessage);

            encounter.TotalCost = 10.999M;

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Total cost must have 2 decimal places", actual2.Value.ErrorMessage);

            encounter.TotalCost = -10.99M;

            var actual3 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Total cost must be a non-negative number with two decimal places", actual3.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidCopay_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Copay = 0;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Copay is required", actual.Value.ErrorMessage);

            encounter.Copay = 10.999M;

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Copay must have 2 decimal places", actual2.Value.ErrorMessage);

            encounter.Copay = -10.99M;

            var actual3 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Copay must be a non-negative number with two decimal places", actual3.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidVisitCode_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.VisitCode = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Visit code is required", actual.Value.ErrorMessage);

            encounter.VisitCode = "123";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Visit code must follow the following format: A1B 2C3", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidBillingCode_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.BillingCode = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Billing code is required", actual.Value.ErrorMessage);

            encounter.BillingCode = "123";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Billing code must follow the following format: 123.456.789-12", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidICD10_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.ICD10 = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("ICD10 is required", actual.Value.ErrorMessage);

            encounter.ICD10 = "123";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("ICD10 must follow the following format: A22", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidDate_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Date = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Date is required", actual.Value.ErrorMessage);

            encounter.Date = "123";

            var actual2 = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Date must have a valid month/day and follow the following format: YYYY-MM-DD", actual2.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidPulse_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Pulse = -1;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Pulse must be a positive number", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidSystolic_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Systolic = -1;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Systolic must be a positive number", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidDiastolic_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Diastolic = -1;

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Diastolic must be a positive number", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_EmptyNotes_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Notes = null;

            Validator.ValidateEncounter(encounter);

            Assert.Equal("", encounter.Notes);
        }

        [Fact]
        public void ValidateEncounter_InvalidProvider_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.Provider = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Provider is required", actual.Value.ErrorMessage);
        }

        [Fact]
        public void ValidateEncounter_InvalidChiefComplaint_Returns400()
        {
            Encounter encounter = encounters[0];
            encounter.ChiefComplaint = "";

            var actual = Assert.Throws<BadRequestException>(() => Validator.ValidateEncounter(encounter));

            Assert.Equal("Chief complaint is required", actual.Value.ErrorMessage);
        }
    }
}
