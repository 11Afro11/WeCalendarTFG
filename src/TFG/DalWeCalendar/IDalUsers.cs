using System;
using DalModel;


namespace DalWeCalendar
{
    public interface IDalUsers
    {
        UsuarioSet GetUsuario(string username);

        UsuarioSet[] GetAmigos(int idUsuario);

        void AddUser(UsuarioSet user);

        string[] correos();

        Boolean Login(string username, string password);

        string SetToken(string username);

        int IDByToken(string token);

        UsuarioSet[] GetAllUsers();

        void Banear(BaneoSet id);

        int[] listaBaneados();
    }
}