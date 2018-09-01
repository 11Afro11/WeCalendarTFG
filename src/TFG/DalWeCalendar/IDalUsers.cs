using System;
using DalModel;


namespace DalWeCalendar
{
    public interface IDalUsers
    {
        UsuarioSet GetUsuario(string username);

        UsuarioSet GetUsuarioById(int id);

        UsuarioSet[] GetAmigos(int idUsuario);

        void ChangeNotification(int idUsuario);

        void AddUser(UsuarioSet user);

        void AddFriend(int idUsuario, int idAmigo);

        string[] correos();

        Boolean Login(string username, string password);

        string SetToken(string username);

        int IDByToken(string token);

        UsuarioSet[] GetAllUsers();

        void Banear(BaneoSet id);

        int[] listaBaneados();

        void RetirarBaneo(int id);

        bool EstaBaneado(string name);
    }
}