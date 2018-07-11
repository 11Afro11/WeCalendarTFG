using System;
using System.Collections.Generic;
using BusinessWeCalendar;
using DalModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BackendWeCalendar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ISrvUser _srvUsuarios;

        public UsersController(ISrvUser srvUsuarios)
        {
            _srvUsuarios = srvUsuarios ?? throw new ArgumentNullException(nameof(srvUsuarios));
        }

        // GET: api/Users
        [HttpGet]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<string> Get()
        {
            return new[] {"value1", "value2"};
        }

        // GET: api/Users/5
        [HttpGet("{nombre}", Name = "Get")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<UsuarioSet> Get(string nombre)
        {
            var result = _srvUsuarios.GetUser(nombre);
            return new[]
            {
                result
            };
        }

        [HttpGet("amigos/{id}", Name = "GetAmigos")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<UsuarioSet> Get(int id)
        {
            var resultado = _srvUsuarios.GetAmigos(id);
            return resultado;
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}