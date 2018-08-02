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
    }
}