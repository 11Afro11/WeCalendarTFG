using System;
using DalModel;


namespace DalWeCalendar
{
    public interface IDalUsers
    {
        UsuarioSet GetUsuario(string username);

        UsuarioSet[] GetAmigos(int idUsuario);

        void AddUser(UsuarioSet user);

    }
}