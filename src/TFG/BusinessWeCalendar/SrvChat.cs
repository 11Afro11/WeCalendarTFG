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

        public void CrearGrupo(string nombreGrupo, string descripcion, int usuarioID)
        {
            _dalChat.CreateChat();
            int idChat = _dalChat.GetChatID();
            GrupoSet grupo = new GrupoSet();
            grupo.Nombre = nombreGrupo;
            grupo.Descripcion = descripcion;
            grupo.CreateDate = DateTime.Today;
            grupo.UsuarioId = usuarioID;
            grupo.ChatId = idChat;
            _dalChat.CrearGrupo(grupo);
            _dalChat.crearTablero(_dalChat.GetLastGrupID());
        }

        public TableroSet[] listaTableros()
        {
            return _dalChat.ListaTableros();
        }

        public int[] listaChat(int idUsuario)
        {
            return _dalChat.ListaChat(idUsuario);
        }

        public GrupoSet[] listaGrupos(int idUsuario)
        {
            return _dalChat.ListaGrupos(idUsuario);
        }

        public void AniadirUaurioAgrupo(int idUsuario, int idGrupo)
        {
            _dalChat.AniadirAlGrupo(idUsuario, idGrupo);
        }
    }
}