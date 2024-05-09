using AutoMapper;
using Solid.API.Models;
using Solid.Core.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Solid.API.Mapping
{
    public class ApiMappingProfile: Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<Employee, EmployeePostModel>().ReverseMap();
            CreateMap<EmployeePosition, EmployeePositionPostModel>().ReverseMap();
            CreateMap<Position, PositionPostModel>().ReverseMap();
        }
    }
}
