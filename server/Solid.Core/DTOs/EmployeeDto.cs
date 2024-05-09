﻿using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Tz { get; set; }
        public DateTime StartWorkDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public List<EmployeePositionDto> EmployeePositions { get; set; }
    }
}