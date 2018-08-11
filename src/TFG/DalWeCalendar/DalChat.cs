using System;
using System.Collections.Generic;
using System.Linq;
using DalModel;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Remotion.Linq.Clauses;

namespace DalWeCalendar
{
    public class DalChat : DalBase<ChatSet>, IDalChat
    {
        public MensajeSet[] GetMensajes(int idUser)
        {
            using (var db = new TFGDatabaseContext())
            {
                var lista = from grups in db.GrupoSet where grups.UsuarioId == idUser select grups.Id;
                var msg = from mensajes in db.MensajeSet where lista.Contains(mensajes.GrupoId) select mensajes;
                List<MensajeSet> listaPendientes = new List<MensajeSet>();
                foreach (MensajeSet ev in msg)
                {
                    listaPendientes.Add(ev);
                }
                MensajeSet[] listaEventos = listaPendientes.ToArray();
                return listaEventos;
            }
        }

        public void InsertarMensaje(MensajeSet mensaje)
        {
            using (var db = new TFGDatabaseContext())
            {
                db.MensajeSet.Add(mensaje);
                db.SaveChanges();
            }
        }

        public UsuarioSet[] GetParticipantes(int idGrupo)
        {
            using (var db = new TFGDatabaseContext())
            {
                var usuariosID = from grups in db.GrupoSet where grups.Id == idGrupo select grups.UsuarioId;
                var asistentes = from list in db.ListaGrupoSet where list.GrupoId == idGrupo select list.UsuarioId;
                var ur = usuariosID.Concat(asistentes);
                var users = from usuarios in db.UsuarioSet where ur.Contains(usuarios.Id) select usuarios;
                //var asist = from usuarios in db.UsuarioSet where asistentes.Contains(usuarios.Id) select usuarios;
                List < UsuarioSet > listaUasuarios = new List<UsuarioSet>();
                //List < UsuarioSet > listaAsistentes = new List<UsuarioSet>();
                foreach (UsuarioSet u in users)
                {
                    listaUasuarios.Add(u);
                }
                /*foreach (UsuarioSet u in asist)
                {
                    listaAsistentes.Add(u);
                }*/

                //var lista = listaUasuarios.Concat(listaAsistentes);
                return listaUasuarios.ToArray();
            }
        }
    }
}