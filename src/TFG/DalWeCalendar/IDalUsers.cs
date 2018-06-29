using System;
using DalModel;


namespace DalWeCalendar
{
    public interface IDalUsers
    {
        UsuarioSet GetUsuario(string username);

        UsuarioSet GetAmigos(string username);

        void AddUser(UsuarioSet user);

    }
}