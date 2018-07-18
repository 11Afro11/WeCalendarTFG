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
    }
}