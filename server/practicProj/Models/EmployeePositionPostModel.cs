using Solid.Core.Entities;

namespace Solid.API.Models
{
    public class EmployeePositionPostModel
    {
        public int PositionId { get; set; }
        //public Position Position { get; set; }
        //public List<Position> Positions { get; set; }

        ////public int EmployeeId { get; set; }
        //public Employee Employee { get; set; }
        public DateTime PositionEntry { get; set; }
        public bool IfManagerial { get; set; }

    }
}
