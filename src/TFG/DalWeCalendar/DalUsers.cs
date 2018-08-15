using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using DalModel;
using Remotion.Linq.Clauses;

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

        public UsuarioSet GetUsuarioById(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                return db.UsuarioSet.First(x => x.Id == id);
            }
        }

        public UsuarioSet[] GetAmigos(int idUsuario)
        {
            using (var db = new TFGDatabaseContext())
            {
                var listaAmigosID = from amigo in db.UsuarioAmigoSet
                    where amigo.UsuarioId == idUsuario
                    select amigo.UsuarioId1;
                var listaAmigos = from amigo in db.UsuarioSet where listaAmigosID.Contains(amigo.Id) select amigo;
                List<UsuarioSet> amigos = new List<UsuarioSet>();
                foreach (UsuarioSet ev in listaAmigos)
                {
                    amigos.Add(ev);
                }

                UsuarioSet[] listFriends = amigos.ToArray();
                return listFriends;
            }
        }

        public void ChangeNotification(int idUsuario)
        {
            using (var db = new TFGDatabaseContext())
            {
                var usuario = (from usr in db.UsuarioSet where usr.Id == idUsuario select usr).FirstOrDefault();
                if (usuario.Notificacion == "YES")
                    usuario.Notificacion = "NO";
                else
                    usuario.Notificacion = "YES";

                db.SaveChanges();
            }
        }

        public void AddUser(UsuarioSet user)
        {
            Add(user);
        }

        public void AddFriend(int idUsuario, int idAmigo)
        {
            using (var db = new TFGDatabaseContext())
            {
                UsuarioAmigoSet relacion = new UsuarioAmigoSet();
                relacion.UsuarioId = idUsuario;
                relacion.UsuarioId1 = idAmigo;
                relacion.CreateDate = DateTime.Today;
                db.UsuarioAmigoSet.Add(relacion);
                db.SaveChanges();
            }
        }

        public string[] correos()
        {
            using (var db = new TFGDatabaseContext())
            {
                var correos = from usuario in db.UsuarioSet select usuario.Correo;
                List<string> listaCorreos = new List<string>();
                foreach (string corr in correos)
                {
                    listaCorreos.Add(corr);
                }
                return correos.ToArray();
            }
        }

        public Boolean Login(string username, string password)
        {
            using (var db = new TFGDatabaseContext())
            {
                var passwd = (from usuarios in db.UsuarioSet
                        where usuarios.NombreUsuario == username
                        select usuarios.Password).FirstOrDefault();

                byte[] hashBytes = Convert.FromBase64String(passwd);
                /* Get the salt */
                byte[] salt = new byte[16];
                Array.Copy(hashBytes, 0, salt, 0, 16);
                /* Compute the hash on the password the user entered */
                var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
                byte[] hash = pbkdf2.GetBytes(20);
                /* Compare the results */
                

                if (passwd == null) return false;
                else
                {
                    for (int i = 0; i < 20; i++)
                        if (hashBytes[i + 16] != hash[i])
                            return false;
                    return true;
                }
            }
        }

        public string SetToken(string username)
        {
            using (var db = new TFGDatabaseContext())
            {
                var usuario = (from usuarios in db.UsuarioSet where usuarios.NombreUsuario == username select usuarios)
                    .FirstOrDefault();
                usuario.Token = Guid.NewGuid().ToString();
                db.SaveChanges();
                return usuario.Token;
            }
        }

        public int IDByToken(string token)
        {
            using (var db = new TFGDatabaseContext())
            {
                var usuario = (from usuarios in db.UsuarioSet where usuarios.Token == token select usuarios.Id)
                    .FirstOrDefault();
                return usuario;
            }
        }

        public UsuarioSet[] GetAllUsers()
        {
            using (var db = new TFGDatabaseContext())
            {
                var users = from user in db.UsuarioSet select user;
                List<UsuarioSet> listaUsuarios = new List<UsuarioSet>();
                foreach (var usr in users)
                {
                    listaUsuarios.Add(usr);
                }

                return listaUsuarios.ToArray();
            }
        }

        public void Banear(BaneoSet id)
        {
            using (var db = new TFGDatabaseContext())
            {
                db.BaneoSet.Add(id);
                db.SaveChanges();
            }
        }

        public int[] listaBaneados()
        {
            using (var db = new TFGDatabaseContext())
            {
                var ids = from id in db.BaneoSet select id.Id;
                List<int> listaID = new List<int>();
                foreach (var i in ids)
                {
                    listaID.Add(i);
                }

                return listaID.ToArray();
            }
        }
    }
}