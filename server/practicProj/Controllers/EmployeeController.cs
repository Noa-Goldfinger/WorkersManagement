using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Solid.API.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace practicProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        readonly IEmployeeService _employeeService;
        readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public ActionResult Get()
        {
            var list= _employeeService.GetAll();
            var listDto = _mapper.Map<IEnumerable<EmployeeDto>>(list);
            return Ok(listDto);
        }
        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var employee = _employeeService.GetById(id);
            var employeeDto= _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }

        //// POST api/<EmployeeController>
        //[HttpPost]
        //public IActionResult Post([FromBody] List<EmployeePostModel> employees)
        //{
        //    var employeesToAdd = employees.Select(e => _mapper.Map<Employee>(e)).ToList();
        //    foreach (var employee in employeesToAdd)
        //    {
        //        _employeeService.Add(employee);
        //    }
        //    return Ok();
        //}

        [HttpPost]
        public async Task<Employee> Post([FromBody] EmployeePostModel employe)
        {
            var employeeToAdd = _mapper.Map<Employee>(employe);
            return await _employeeService.AddAsync(employeeToAdd);
        }
        
        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] EmployeePostModel employe)
        {
            var employeeToUpdate = _mapper.Map<Employee>(employe);
            var ifExistEmp = _employeeService.GetById(id);
            if (ifExistEmp==null)
                return NotFound();
            return Ok(_employeeService.Update(id, employeeToUpdate));
        }
        // PUT api/<EmployeeController>/5
        [HttpPut("status/{id}")]
        public ActionResult Put(int id)
        {
            var ifExistEmp = _employeeService.GetById(id);
            if (ifExistEmp==null)
                return NotFound();
            return Ok(_employeeService.UpdateStatus(ifExistEmp));
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _employeeService.Delete(id);
        }
    }
}
