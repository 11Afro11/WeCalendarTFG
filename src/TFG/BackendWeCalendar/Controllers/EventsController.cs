﻿using System;
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

        // POST: api/Events
        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        public bool Post([FromBody] JSONEvento evento)
        {
            _srvEventos.AddEvento(evento);
            return true;
        }

        // PUT: api/Events/5
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