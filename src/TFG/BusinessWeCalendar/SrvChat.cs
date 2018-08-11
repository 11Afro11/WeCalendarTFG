using System;
using System.Collections.Generic;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;
using DalWeCalendar;

namespace BusinessWeCalendar
{
    public class SrvChat : SrvBase, ISrvChat
    {
        private readonly IDalChat _dalChat;

        public SrvChat(IDalChat dalChat)
        {
            _dalChat = dalChat ?? throw new ArgumentNullException(nameof(dalChat));
        }

        public MensajeSet[] GetMensajes(int idUser)
        {
            return _dalChat.GetMensajes(idUser);
        }

        public void InsertarMensaje(JSONMsg mensaje)
        {
            MensajeSet mens = new MensajeSet();
            mens.Texto = mensaje.texto;
            mens.GrupoId = mensaje.grupoId;
            mens.ChatId = mensaje.chatId;
            mens.UsuarioId = mensaje.usuarioId;
            mens.CreateDate = mensaje.createDate.ToString();
            _dalChat.InsertarMensaje(mens);
        }

        public JSONUserSecure[] UsuariosInGrup(int id)
        {
            UsuarioSet[] usuarios = _dalChat.GetParticipantes(id);
            List<JSONUserSecure> listaUsuarios = new List<JSONUserSecure>();
            
            foreach (var user in usuarios)
            {
                JSONUserSecure usuario = new JSONUserSecure();
                usuario.id = user.Id;
                usuario.nombre = user.NombreUsuario;
                listaUsuarios.Add(usuario);
            }

            return listaUsuarios.ToArray();
        }
    }
}