using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IPositionRepository
    {
        public Position Add(Position position);
        public void Delete(int id);
        public IEnumerable<Position> GetAll();
        public Position GetById(int id);
        public Position Update(int id, Position position);
    }
}
