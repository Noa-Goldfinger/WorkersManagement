using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class PositionRepository:IPositionRepository
    {
        readonly DataContext _dataContext;
        public PositionRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public Position Add(Position position)
        {
            _dataContext.Positions.Add(position);
            _dataContext.SaveChanges();
            return position;
        }
        public void Delete(int id)
        {
            var user = GetById(id);
            _dataContext.Positions.Remove(user);
            _dataContext.SaveChanges();
        }

        public IEnumerable<Position> GetAll()
        {
            return _dataContext.Positions;//.Include).ThenInclude(e=>e.Employee);
        }

        public Position GetById(int id)
        {
            return _dataContext.Positions.Find(id);//.Include(e => e.EmployeePositions).First(e => e.Id == id); ;
        }

        public Position Update(int id, Position position)
        {
            var existPosition = GetById(id);
            existPosition.Name = position.Name;
            //existPosition.IfManagerial = position.IfManagerial;
            //existPosition.EmployeePositions= position.EmployeePositions;
            _dataContext.SaveChanges();
            return existPosition;
        }
    }
}
