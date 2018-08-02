using System;
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
    }
}