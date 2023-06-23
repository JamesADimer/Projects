using Catalyte.Apparel.Data.Models;
using System.Collections.Generic;

namespace Catalyte.Apparel.TestBase.Helpers
{
    public class EncounterHelper
    {

        public static Encounter GenerateValidEncounter()
        {
            return new Encounter()
            {
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
            };
        }

        public static Encounter GenerateInvalidEncounters(int e)
        {
            List<Encounter> encounters = new()
            {
                new Encounter()
                {   // Missing visitcode
                    PatientId = 1,
                    Notes = "",
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
                },
                new Encounter()
                {   // Missing provider
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Missing billingcode
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Missing icd10
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Missing totalcost
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Missing copay
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Missing chiefcomplaint
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Missing date
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
                    Diastolic = 80
                },
                new Encounter()
                {   // Invalid visitcode
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A1A1",
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
                },
                new Encounter()
                {   // Invalid billingcode
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "12312312312",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid icd10
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "AA1",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid totalcost
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    TotalCost = -1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid copay
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    Copay = -200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = 100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid date
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
                    Date = "11/24/2021"
                },
                new Encounter()
                {   // Invalid post
                    PatientId = 1,
                    Notes = "",
                    VisitCode = "A1A 1A1",
                    Provider = "Clinic",
                    BillingCode = "123.123.123-12",
                    ICD10 = "A11",
                    TotalCost = 1500.99M,
                    Copay = 200.99M,
                    ChiefComplaint = "Headache",
                    Pulse = -100,
                    Systolic = 80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid systolic
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
                    Systolic = -80,
                    Diastolic = 80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid diastolic
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
                    Diastolic = -80,
                    Date = "2021-11-24"
                },
                new Encounter()
                {   // Invalid patientid
                    PatientId = 100,
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
            return encounters[e];
        }
    }
}
