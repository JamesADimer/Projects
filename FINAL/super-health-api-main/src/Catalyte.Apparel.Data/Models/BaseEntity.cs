using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Catalyte.Apparel.Data.Models
{
    /// <summary>
    /// This class represents a base for all other entities.
    /// </summary>
    public class BaseEntity
    {

        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        [JsonIgnore]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
    }

}
