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
    public class ChatController : ControllerBase
    {

        private readonly ISrvChat _srvChat;

        public ChatController(ISrvChat srvChat)
        {
            _srvChat = srvChat ?? throw new ArgumentNullException(nameof(srvChat));
        }

        // GET: api/Chat
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Chat/5
        [HttpGet("{id}", Name = "Msg")]
        [EnableCors("AllowSpecificOrigin")]
        public MensajeSet[] Msg(int id)
        {
            return _srvChat.GetMensajes(id);
        }

        // POST: api/Chat
        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        public bool Post([FromBody] JSONMsg value)
        {
            _srvChat.InsertarMensaje(value);
            return true;
        }

        // PUT: api/Chat/5
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
