using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Catalyte.Apparel.Data.Models
{
    /// <summary>
    /// Describes a super health patient encounter.
    /// </summary>
    public class Encounter : BaseEntity
    {
        public int PatientId { get; set; }

        public string Notes { get; set; }

        public string VisitCode { get; set; }

        public string Provider { get; set; }

        public string BillingCode { get; set; }

        public string ICD10 { get; set; }

        public decimal TotalCost { get; set; }

        public decimal Copay { get; set; }

        public string ChiefComplaint { get; set; }

        public int? Pulse { get; set; }

        public int? Systolic { get; set; }

        public int? Diastolic { get; set; }

        public string Date { get; set; }

    }
}
