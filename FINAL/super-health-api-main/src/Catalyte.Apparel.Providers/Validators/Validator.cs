using System;
using System.Linq;
using System.Text.RegularExpressions;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.Utilities.HttpResponseExceptions;

namespace Catalyte.Apparel.Providers.Validators
{
    public static class Validator
    {
        /// <summary>
        /// Validates that each field in the given patient object passes requirements for validation. 
        /// Throws exceptions if patient object is invalid.
        /// </summary>
        /// <param name="patient">The patient object being validated.</param>
        /// <returns></returns>
        public static void ValidatePatient(this Patient patient)
        {   
            // Check if first name is empty or null
            if (String.IsNullOrWhiteSpace(patient.FirstName))
            {
                throw new BadRequestException("First name is required");
            }

            // Check if last name is empty or null
            if (String.IsNullOrWhiteSpace(patient.LastName))
            {
                throw new BadRequestException("Last name is required");
            }

            // Check if ssn is empty or null
            if (String.IsNullOrWhiteSpace(patient.SSN))
            {
                throw new BadRequestException("Social security number (SSN) is required");
            }

            // Check if email is empty or null
            if (String.IsNullOrWhiteSpace(patient.Email))
            {
                throw new BadRequestException("Email is required");
            }

            // Check if age is empty or null
            if (patient.Age == 0)
            {
                throw new BadRequestException("Age is required");
            }

            // Check if height is empty or null
            if (patient.Height == 0)
            {
                throw new BadRequestException("Height is required");
            }

            // Check if weight is empty or null
            if (patient.Weight == 0)
            {
                throw new BadRequestException("Weight is required");
            }

            // Check if insurance is empty or null
            if (String.IsNullOrWhiteSpace(patient.Insurance))
            {
                throw new BadRequestException("Insurance is required");
            }

            // Check if gender is empty or null
            if (String.IsNullOrWhiteSpace(patient.Gender))
            {
                throw new BadRequestException("Gender is required");
            }

            // Check if street is empty or null
            if (String.IsNullOrWhiteSpace(patient.Street))
            {
                throw new BadRequestException("Street is required");
            }

            // Check if city is empty or null
            if (String.IsNullOrWhiteSpace(patient.City))
            {
                throw new BadRequestException("City is required");
            }

            // Check if state is empty or null
            if (String.IsNullOrWhiteSpace(patient.State))
            {
                throw new BadRequestException("State is required");
            }

            // Check if postal code is empty or null
            if (String.IsNullOrWhiteSpace(patient.Postal))
            {
                throw new BadRequestException("Postal code is required");
            }

            // Check if SSN is valid format
            Regex rgSSN = new (@"^[0-9]{3}-[0-9]{2}-[0-9]{4}$");
            if (patient.SSN != null && !rgSSN.IsMatch(patient.SSN))
            {
                throw new BadRequestException("SSN must follow the following format: 123-12-1234");
            }

            // Check if email is valid format
            Regex rgEmail = new (@"^[A-Za-z0-9]+@[A-Za-z]+.([A-Za-z]{2,4})$");
            if (patient.Email != null && !rgEmail.IsMatch(patient.Email))
            {
                throw new BadRequestException("Email must follow the following format: username@domain.com");
            }

            // Check that age is a number and is greater than 0
            if (patient.Age < 1)
            {
                throw new BadRequestException("Age must be a positive whole number");
            }

            // Check that height is a number and is greater than 0
            if (patient.Height < 1)
            {
                throw new BadRequestException("Height must be a positive whole number");
            }

            // Check that weight is a number and is greater than 0
            if (patient.Weight < 1)
            {
                throw new BadRequestException("Weight must be a positive whole number");
            }

            // Check that gender is a valid option
            string[] genders = { "Male", "Female", "Other" };
            if (patient.Gender != null && !genders.Contains(patient.Gender))
            {
                throw new BadRequestException("Gender must be Male, Female, or Other");
            }

            // Check that state is a valid state code
            string[] states = { "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" };
            if (patient.State != null && !states.Contains(patient.State))
            {
                throw new BadRequestException("State must be a valid two letter abbreviation");
            }

            // Check that the postal code is valid
            Regex rgPostal = new (@"^[0-9]{5}(?:-[0-9]{4})?$");
            if (patient.Postal != null && !rgPostal.IsMatch(patient.Postal))
            {
                throw new BadRequestException("Postal code must follow the following format: 12345 or 12345-1234");
            }
        }
        
        /// <summary>
        /// Validates that each field in the given encounter object passes requirements for validation. 
        /// Throws exceptions if encounter object is invalid.
        /// </summary>
        /// <param name="encounter">The encounter object being validated.</param>
        /// <returns></returns>
        public static void ValidateEncounter(this Encounter encounter)
        {
            // Check if visit code is empty or null
            if (String.IsNullOrWhiteSpace(encounter.VisitCode))
            {
                throw new BadRequestException("Visit code is required");
            }

            // Check if provider is empty or null
            if (String.IsNullOrWhiteSpace(encounter.Provider))
            {
                throw new BadRequestException("Provider is required");
            }

            // Check if billing code is empty or null
            if (String.IsNullOrWhiteSpace(encounter.BillingCode))
            {
                throw new BadRequestException("Billing code is required");
            }

            // Check if icd10 is empty or null
            if (String.IsNullOrWhiteSpace(encounter.ICD10))
            {
                throw new BadRequestException("ICD10 is required");
            }

            // Check if total cost is empty or null
            if (encounter.TotalCost == 0)
            {
                throw new BadRequestException("Total cost is required");
            }

            // Check if copay is empty or null
            if (encounter.Copay == 0)
            {
                throw new BadRequestException("Copay is required");
            }

            // Check if chief complaint is empty or null
            if (String.IsNullOrWhiteSpace(encounter.ChiefComplaint))
            {
                throw new BadRequestException("Chief complaint is required");
            }

            // Check if date is empty or null
            if (String.IsNullOrWhiteSpace(encounter.Date))
            {
                throw new BadRequestException("Date is required");
            }

            // Check if visit code is valid format
            Regex rgVisitCode = new (@"^([A-Z][0-9][A-Z]) ([0-9][A-Z][0-9])$");
            if (encounter.VisitCode != null && !rgVisitCode.IsMatch(encounter.VisitCode))
            {
                throw new BadRequestException("Visit code must follow the following format: A1B 2C3");
            }

            // Check if billing code is valid format
            Regex rgBillingCode = new (@"^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$");
            if (encounter.BillingCode != null && !rgBillingCode.IsMatch(encounter.BillingCode))
            {
                throw new BadRequestException("Billing code must follow the following format: 123.456.789-12");
            }

            // Check if icd10 is valid format
            Regex rgICD10 = new (@"^[A-Z][0-9]{2}$");
            if (encounter.ICD10 != null && !rgICD10.IsMatch(encounter.ICD10))
            {
                throw new BadRequestException("ICD10 must follow the following format: A22");
            }

            // Check if total cost has 2 decimal places
            if (Decimal.Round(encounter.TotalCost, 2) != encounter.TotalCost)
            {
                throw new BadRequestException("Total cost must have 2 decimal places");
            }

            // Check if copay has two decimal places
            if (Decimal.Round(encounter.Copay, 2) != encounter.Copay)
            {
                throw new BadRequestException("Copay must have 2 decimal places");
            }

            // Check if total cost is valid format
            Regex rgCurrency = new (@"^[0-9]+\.[0-9]{2}$");
            if (!rgCurrency.IsMatch(encounter.TotalCost.ToString("0.00")))
            {
                throw new BadRequestException("Total cost must be a non-negative number with two decimal places");
            }

            // Check if copay is valid format
            if (!rgCurrency.IsMatch(encounter.Copay.ToString("0.00")))
            {
                throw new BadRequestException("Copay must be a non-negative number with two decimal places");
            }

            // Check that date is valid format
            Regex rgDate = new (@"^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$");
            if (encounter.Date != null && !rgDate.IsMatch(encounter.Date))
            {
                throw new BadRequestException("Date must have a valid month/day and follow the following format: YYYY-MM-DD");
            }

            // Check that if pulse is entered, it is greater than 0
            if (encounter.Pulse.HasValue && encounter.Pulse < 1)
            {
                throw new BadRequestException("Pulse must be a positive number");
            }

            // Check that if systolic is entered, it is greater than 0
            if (encounter.Systolic.HasValue && encounter.Systolic < 1)
            {
                throw new BadRequestException("Systolic must be a positive number");
            }

            // Check that if diastolic is entered, it is greater than 0
            if (encounter.Diastolic.HasValue && encounter.Diastolic < 1)
            {
                throw new BadRequestException("Diastolic must be a positive number");
            }

            // Check that if no notes are entered, it is an empty string
            if (encounter.Notes == null)
            {
                encounter.Notes = "";
            }
        }
    }
}
