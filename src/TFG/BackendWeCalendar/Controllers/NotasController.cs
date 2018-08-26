using System;
using System.Collections.Generic;
using BackendWeCalendar.Controllers.JsonRecivers;
using BusinessWeCalendar;
using DalModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BackendWeCalendar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly ISrvNota _srvNota;

        public NotasController(ISrvNota srvNota)
        {
            _srvNota = srvNota ?? throw new ArgumentNullException(nameof(srvNota));
        }

        // GET: api/Notas
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Notas/5
        [HttpGet("{id}", Name = "GetNotas")]
        [EnableCors("AllowSpecificOrigin")]
        public NotaSet[] GetNotas(int id)
        {
            return _srvNota.GetNota(id);
        }

        [HttpGet("all", Name = "GetNotasAll")]
        [EnableCors("AllowSpecificOrigin")]
        public NotaSet[] GetNotasAll()
        {
            return _srvNota.GetNotas();
        }

        // GET: api/Notas/5
        [HttpGet("grupo/{id}", Name = "GetNotasGrupo")]
        [EnableCors("AllowSpecificOrigin")]
        public NotaSet[] GetNotasGrupo(int id)
        {
            return _srvNota.GetNotaByGroup(id);
        }

        // POST: api/Notas
        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        public void Post([FromBody] JSONNota value)
        {
            _srvNota.NuevaNota(value);
        }

        // POST: api/Notas
        [HttpPost("tablero", Name="InsertarNotaTablero")]
        [EnableCors("AllowSpecificOrigin")]
        public void Insertar([FromBody] JSONNotaTablero value)
        {
            _srvNota.NuevaNotaTablero(value);
        }

        // PUT: api/Notas/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _srvNota.DeleteNota(id);
        }
    }
}
