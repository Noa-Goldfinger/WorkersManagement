using Solid.Core.Entities;

namespace Solid.API.Models
{
    public class EmployeePostModel
    {
        public string FName { get; set; }
        public string LName { get; set; }
        public string Tz { get; set; }
        public DateTime StartWorkDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public List<EmployeePositionPostModel> EmployeePositions { get; set; }
    }
}
