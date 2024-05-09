using AutoMapper;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee,EmployeeDto>().ReverseMap();
            CreateMap<EmployeePosition,EmployeePositionDto>().ReverseMap();
        }
    }
}
