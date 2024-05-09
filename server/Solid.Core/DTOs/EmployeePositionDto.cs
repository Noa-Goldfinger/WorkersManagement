using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployeePositionDto
    {
        public int Id { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        //public List<Position> Positions { get; set; }

        public DateTime PositionEntry { get; set; }
        public bool IfManagerial { get; set; }

    }
}
