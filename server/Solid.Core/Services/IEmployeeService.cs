using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IEmployeeService
    {
        public Employee Add(Employee position);
        public void Delete(int id);
        public IEnumerable<Employee> GetAll();
        public Employee GetById(int id);
        public Employee Update(int id, Employee position);
        public Employee UpdateStatus(Employee emp);
    }
}
