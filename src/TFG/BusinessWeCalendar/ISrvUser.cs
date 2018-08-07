using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvUser
    {
        UsuarioSet GetUser(string usuario);
        UsuarioSet[] GetAmigos(int idUsuario);
        string Login(string username, string password);
        int GetIDByToken(string token);
        UsuarioSet[] GetAllUsers();
    }
}