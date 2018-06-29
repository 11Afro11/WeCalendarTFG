using System.Linq;
using DalModel;

namespace DalWeCalendar
{
    public class DalUsers : DalBase<UsuarioSet>, IDalUsers
    {
        public UsuarioSet GetUsuario(string username)
        {
            using (var db = new TFGDatabaseContext())
            {
                return db.UsuarioSet.First(x => x.NombreUsuario == username);
            }
        }

        public UsuarioSet GetAmigos(string username)
        {
            using (var db = new TFGDatabaseContext())
            {
                var user = db.UsuarioSet.First(x => x.NombreUsuario == username);
                var id = user.Id;
                return null;
                //UsuarioAmigoSet friendsID = db.UsuarioAmigoSet.Find(y => y.Usuario_id == id);
                /*return db.UsuarioSet.Find(x =>
                {
                    x.NombreUsuario == username
                })*/
            }
        }

        public void AddUser(UsuarioSet user)
        {
            Add(user);
        }
    }
}