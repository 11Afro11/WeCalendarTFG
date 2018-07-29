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

        public string Login(string username, string password)
        {
            if (_dalUsers.Login(username, password))
            {
                return _dalUsers.SetToken(username);
            }
            else return null;
        }

        public int GetIDByToken(string token)
        {
            return _dalUsers.IDByToken(token);
        }
    }
}