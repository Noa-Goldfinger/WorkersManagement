using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public class EmployeePosition
    {
        public int Id { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        //public List<Position> Positions { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public DateTime PositionEntry { get; set; }
        public bool IfManagerial { get; set; }
    }
}
