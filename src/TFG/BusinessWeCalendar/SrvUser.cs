using System;
using System.Security.Cryptography;
using BackendWeCalendar.Controllers.JsonRecivers;
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

        public UsuarioSet GetUser(int id)
        {
            return _dalUsers.GetUsuarioById(id);
        }

        public UsuarioSet[] GetAmigos(int idUsuario)
        {
            return _dalUsers.GetAmigos(idUsuario);
        }

        public void AddFriend(int idUsuario, string amigo)
        {
            int idAmigo = GetUser(amigo).Id;
            _dalUsers.AddFriend(idUsuario, idAmigo);
        }

        public void SetNotificacion(int idUsuario)
        {
            _dalUsers.ChangeNotification(idUsuario);
        }

        public string Login(string username, string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string savedPasswordHash = Convert.ToBase64String(hashBytes);

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

        public UsuarioSet[] GetAllUsers()
        {
            return _dalUsers.GetAllUsers();
        }

        public void Banear(int idUsuario, int idAdmin)
        {
            DateTime today = DateTime.Today;
            BaneoSet ban = new BaneoSet();
            ban.CreateDate = today;
            ban.AdministradorId = idAdmin;
            ban.UsuarioId = idUsuario;
            _dalUsers.Banear(ban);
        }

        public int[] ListaBaneados()
        {
            return _dalUsers.listaBaneados();
        }

        public string Register(JSONRegister datos)
        {
            UsuarioSet user = new UsuarioSet();
            user.NombreUsuario = datos.username;
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(datos.passwd, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string savedPasswordHash = Convert.ToBase64String(hashBytes);

            user.Password = savedPasswordHash;
            user.Correo = datos.correo;
            user.Foto = "foto";
            user.Notificacion = "YES";
            user.CreateDate = DateTime.Today;
            user.Token = Guid.NewGuid().ToString();
            _dalUsers.AddUser(user);
            return Login(user.NombreUsuario, datos.passwd);
        }

        public void RetirarBaneo(int id)
        {
            _dalUsers.RetirarBaneo(id);
        }

        public bool EstaBaneado(string nombre)
        {
            return _dalUsers.EstaBaneado(nombre);
        }

        public void EditarCorreo(int id, string correo)
        {
            _dalUsers.EditarCorreo(id, correo);
        }
    }
}