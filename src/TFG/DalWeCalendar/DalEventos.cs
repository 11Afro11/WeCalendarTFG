using System.Collections.Generic;
using System.Linq;
using DalModel;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Remotion.Linq.Clauses;

namespace DalWeCalendar
{
    public class DalEventos : DalBase<EventoSet>, IDalEventos
    {
        public EventoSet[] GetEventoCreador(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                var eventos = from evento in db.EventoSet where evento.UsuarioId == id select evento;
                //EventoSet[] eventos = from evento in EventoSet where evento.UsuarioId == id select evento;
                
                List<EventoSet> termList = new List<EventoSet>();
                foreach (EventoSet ev in eventos)
                {
                    termList.Add(ev);
                }

                EventoSet[] listaEventos = termList.ToArray();
                return listaEventos;
                //return db.UsuarioSet.First(x => x.NombreUsuario == username);
            }
        }

        public void AddEvento(EventoSet evento)
        {
            EntityEntry<EventoSet> conseguido = Add(evento);
        }
    }
}