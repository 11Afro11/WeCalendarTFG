using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvUser
    {
        UsuarioSet GetUser(string usuario);
        UsuarioSet GetUser(int id);
        UsuarioSet[] GetAmigos(int idUsuario);
        void AddFriend(int idUsuario, string amigo);
        void SetNotificacion(int idUsuario);
        string Login(string username, string password);
        int GetIDByToken(string token);
        UsuarioSet[] GetAllUsers();
        void Banear(int idUsuario, int idAdmin);
        int[] ListaBaneados();
        string Register(JSONRegister datos);
        void RetirarBaneo(int id);
    }
}