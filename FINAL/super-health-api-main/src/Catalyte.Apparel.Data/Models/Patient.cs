using Newtonsoft.Json;

using System.ComponentModel.DataAnnotations;

namespace Catalyte.Apparel.Data.Models
{
    /// <summary>
    /// Describes a super health patient.
    /// </summary>
    public class Patient : BaseEntity
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string SSN { get; set; }

        public string Email { get; set; }

        public int Age { get; set; }

        public int Height { get; set; }

        public int Weight { get; set; }

        public string Insurance { get; set; }

        public string Gender { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Postal { get; set; }

    }
}