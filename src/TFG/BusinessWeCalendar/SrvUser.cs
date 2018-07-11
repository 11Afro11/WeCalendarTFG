using System;
using DalModel;
using DalWeCalendar;

namespace BusinessWeCalendar
{
    public class SrvUser : SrvBase, ISrvUser
    {
        private readonly IDalUsers _dalUsers;

        public SrvUser(IDalUsers dalUsers)
        {
            _dalUsers = dalUsers ?? throw new ArgumentNullException(nameof(dalUsers));
        }

        public UsuarioSet GetUser(string usuario)
        {
            return _dalUsers.GetUsuario(usuario);
        }

        public UsuarioSet[] GetAmigos(int idUsuario)
        {
            return _dalUsers.GetAmigos(idUsuario);
        }
    }
}