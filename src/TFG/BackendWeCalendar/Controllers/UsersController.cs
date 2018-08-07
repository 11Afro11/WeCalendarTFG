﻿using System;
using System.Collections.Generic;
using BusinessWeCalendar;
using DalModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

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

        [HttpGet("all", Name = "GetAll")]
        [EnableCors("AllowSpecificOrigin")]
        public IEnumerable<UsuarioSet> All()
        {
            var resultado = _srvUsuarios.GetAllUsers();
            return resultado;
        }

        [HttpGet("correo", Name = "sendMail")]
        [EnableCors("AllowSpecificOrigin")]
        public void Correo()
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("javier.fuentes78@gmail.com", "javier Fuentes"),
                Subject = "Prueba numero 1",
                PlainTextContent = "Hola mundo"
            };
            msg.AddTo(new EmailAddress("javierfuentesbarragan@gmail.com", "Javier Fuentes"));
            client.SendEmailAsync(msg);
        }

        [HttpPut("login/{username}", Name = "Validate")]
        [EnableCors("AllowSpecificOrigin")]
        public string Login(string username, [FromBody] string passwd)
        {
            return _srvUsuarios.Login(username, passwd);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        

        // DELETE: api/ApiWithActions/5
        [HttpGet("token/{token}", Name = "Token")]
        [EnableCors("AllowSpecificOrigin")]
        public int Token(string token)
        {
            return _srvUsuarios.GetIDByToken(token);
        }
    }
}