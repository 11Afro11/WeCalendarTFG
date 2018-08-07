using System;
using System.Collections.Generic;
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

        public void AddUser(UsuarioSet user)
        {
            Add(user);
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
                if (passwd == null) return false;
                else
                {
                    return (passwd == password);
                }
            }
        }

        public string SetToken(string username)
        {
            using (var db = new TFGDatabaseContext())
            {
                var usuario = (from usuarios in db.UsuarioSet where usuarios.NombreUsuario == username select usuarios)
                    .FirstOrDefault();
                usuario.Token = "NewToken"+1;
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
    }
}