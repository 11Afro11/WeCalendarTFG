using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvUser
    {
        UsuarioSet GetUser(string usuario);
        UsuarioSet[] GetAmigos(int idUsuario);
    }
}