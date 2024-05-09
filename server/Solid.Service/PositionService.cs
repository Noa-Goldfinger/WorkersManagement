using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class PositionService:IPositionService
    {
        readonly IPositionRepository _positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public Position Add(Position position)
        {
           return _positionRepository.Add(position);
        }
        public void Delete(int id)
        {
            _positionRepository.Delete(id);
        }

        public IEnumerable<Position> GetAll()
        {
            return _positionRepository.GetAll();
        }

        public Position GetById(int id)
        {
            return _positionRepository.GetById(id);
        }

        public Position Update(int id, Position position)
        {
          return _positionRepository.Update(id, position);
        }

    }
}
