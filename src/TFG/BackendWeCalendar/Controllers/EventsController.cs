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
    public class EventsController : ControllerBase
    {
        private readonly ISrvEvents _srvEventos;

        public EventsController(ISrvEvents srvEvent)
        {
            _srvEventos = srvEvent ?? throw new ArgumentNullException(nameof(srvEvent));
        }

        // GET: api/Events
        [HttpGet]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<string> Get()
        {
            return new[] {"value1", "value2"};
        }

        // GET: api/Events/5
        [HttpGet("{id}", Name = "Conseguir")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<EventoSet> Get(int id)
        {
            var result = _srvEventos.GetEventoCreador(id);
            return result;
            /*
            return new[]
            {
                result
            };*/
        }

        // GET: api/Events/invitacion/5
        [HttpGet("invitacion/{id}", Name = "ConseguirInvitacion")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<EventoSet> GetInvitacion(int id)
        {
            var result = _srvEventos.GetEventosAsistencia(id);
            return result;
            /*
            return new[]
            {
                result
            };*/
        }

        [HttpGet("asistentes/{id}", Name = "ConseguirAsistentes")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<String> GetAsistentes(int id)
        {
            var result = _srvEventos.ListaAsistentes(id);
            return result;
        }

        [HttpGet("pendientes/{id}", Name = "GetPendientes")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<EventoSet> GetPendientes(int id)
        {
            var retult = _srvEventos.GetListaPendientes(id);
            return retult;
        }

        // POST: api/Events
        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        public bool Post([FromBody] JSONEvento evento)
        {
            _srvEventos.AddEvento(evento);
            return true;
        }
        
        [HttpPost("share", Name ="Compartir")]
        [EnableCors("AllowSpecificOrigin")]
        public bool Post([FromBody] JSONPendiente pendiente)
        {
            _srvEventos.CompartirEvento(pendiente.idEvento, pendiente.idUsuario);
            return true;
        }

        // PUT: api/Events/5
        [HttpPut("{id}")]
        [EnableCors("AllowSpecificOrigin")]
        public void Put(int id, [FromBody] JSONEditEvent value)
        {
            _srvEventos.EditEvento(id, value.fecha, value.horaInicio, value.horafin);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [EnableCors("AllowSpecificOrigin")]
        public void Delete(int id)
        {
            _srvEventos.RemoveEvento(id);
        }
        [HttpDelete("anularInvitacion/{idUsuario}/{idEvento}", Name = "AnularInvitacion")]
        [EnableCors("AllowSpecificOrigin")]
        public void Delete(int idUsuario, int idEvento)
        {
            _srvEventos.AnularInvitacion(idUsuario, idEvento);
        }

        [HttpPut("aceptarInvitacion/{idUsuario}/{idEvento}", Name = "AceptarInvitacion")]
        [EnableCors("AllowSpecificOrigin")]
        public void Put(int idUsuario, int idEvento)
        {
            _srvEventos.AceptarInvitacion(idUsuario, idEvento);
        }

        [HttpDelete("cancelarEvento/{idUsuario}/{idEvento}", Name = "CancelarEvento")]
        [EnableCors("AllowSpecificOrigin")]
        public void Borrar(int idUsuario, int idEvento)
        {
            _srvEventos.CancelarEvento(idUsuario, idEvento);
        }


    }
}