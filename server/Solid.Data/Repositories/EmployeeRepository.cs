using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class EmployeeRepository:IEmployeeRepository
    {
        readonly DataContext _dataContext;
        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public Employee Add(Employee employee)
        {
            _dataContext.Employees.Add(employee);
            _dataContext.SaveChanges();
            return employee;
        }
        public void Delete(int id)
        {
            var user = GetById(id);
            _dataContext.Employees.Remove(user);
            _dataContext.SaveChanges();
        }

        public IEnumerable<Employee> GetAll()
        {       
            return _dataContext.Employees.Include(e => e.EmployeePositions).ThenInclude(e => e.Position);
        }
        public Employee GetById(int id)
        {
            return _dataContext.Employees.Include(e => e.EmployeePositions).ThenInclude(e => e.Position).First(e => e.Id == id);
        }

        public Employee Update(int id, Employee employee)
        {
            var existEmployee = GetById(id);
//לבדוק כי נראה לי שיש אופציה לסדר במקום הפרוט, אלא בבת אחת
//כן, יש כשמגיעה לaouto mapper
            existEmployee.LName = employee.LName;
            existEmployee.FName = employee.FName;
            existEmployee.IsActive = employee.IsActive;
            existEmployee.StartWorkDate = employee.StartWorkDate;
            existEmployee.Gender = employee.Gender;
            existEmployee.DateBirth = employee.DateBirth;
            existEmployee.Tz=   employee.Tz;
            existEmployee.EmployeePositions = employee.EmployeePositions;
            _dataContext.SaveChanges();
            return existEmployee;
        }
        public Employee UpdateStatus(Employee emp)
        {
            emp.IsActive = !emp.IsActive;
            _dataContext.SaveChanges();
            return emp;
        }

    }
}
