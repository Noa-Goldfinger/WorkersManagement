using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Models;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using Solid.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        readonly IPositionService _positionService;
        readonly IMapper _mapper;
        public PositionController(IPositionService positionService,IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }

        // GET: api/<PositionController>
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_positionService.GetAll());
        }

        // GET api/<PositionController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            return Ok(_positionService.GetById(id));        
        }

        // POST api/<PositionController>
        [HttpPost]
        public ActionResult Post([FromBody] PositionPostModel position)
        {
            var positionTOAdd = _mapper.Map<Position>(position);
            return Ok(_positionService.Add(positionTOAdd));
        }

        // PUT api/<PositionController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PositionPostModel position)
        {
            var positionToUpdate = _mapper.Map<Position>(position);
            var ifExistPos = _positionService.GetById(id);
            if (ifExistPos == null)
                return NotFound();
            return Ok(_positionService.Update(id, positionToUpdate));
        }

        // DELETE api/<PositionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _positionService.Delete(id);
        }
    }
}