using AutoMapper;
using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.DTOs.Patients;
using Catalyte.Apparel.DTOs.Encounters;

namespace Catalyte.Apparel.API
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Patient, PatientDTO>().ReverseMap();

            CreateMap<Encounter, EncounterDTO>().ReverseMap();
        }

    }
}
