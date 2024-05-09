using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IEmployeeRepository
    {
        public Employee Add(Employee employee);
        public void Delete(int id);
        public IEnumerable<Employee> GetAll();
        public Employee GetById(int id);
        public Employee Update(int id, Employee employee);
        public Employee UpdateStatus(Employee emp);
    }
}
