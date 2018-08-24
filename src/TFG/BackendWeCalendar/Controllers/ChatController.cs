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

        // GET: api/Chat/5
        [HttpGet("tableros", Name = "Tableros")]
        [EnableCors("AllowSpecificOrigin")]
        public TableroSet[] Tableros()
        {
            return _srvChat.listaTableros();
        }

        // GET: api/Chat/5
        [HttpGet("grupos/{id}", Name = "grupos")]
        [EnableCors("AllowSpecificOrigin")]
        public GrupoSet[] grupos(int id)
        {
            return _srvChat.listaGrupos(id);
        }

        // GET: api/Chat/5
        [HttpGet("chat/{id}", Name = "chat")]
        [EnableCors("AllowSpecificOrigin")]
        public TableroSet[] chat(int id)
        {
            return _srvChat.listaTableros();
        }

        // GET: api/Chat/5
        [HttpGet("participantes/{id}", Name = "Participantes")]
        [EnableCors("AllowSpecificOrigin")]
        public JSONUserSecure[] participentes(int id)
        {
            return _srvChat.UsuariosInGrup(id);
        }

        // POST: api/Chat
        [HttpPost("newGrup", Name = "NewGrup")]
        [EnableCors("AllowSpecificOrigin")]
        public bool NewGrup([FromBody] JSONGrup value)
        {
            _srvChat.CrearGrupo(value.nombre, value.descripcion, value.id);
            return true;
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
        [HttpPut("newUserGrup/{idUsuario}/{idGrupo}", Name="NuevoUsuarioGrupo")]
        [EnableCors("AllowSpecificOrigin")]
        public void Put(int idUsuario, int idGrupo)
        {
            _srvChat.AniadirUaurioAgrupo(idUsuario, idGrupo);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
