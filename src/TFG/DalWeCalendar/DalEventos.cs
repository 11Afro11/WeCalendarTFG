using System;
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

        public void RemoveEvento(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                var eventos = (from evento in db.EventoSet where evento.Id == id select evento).FirstOrDefault();
                var pendiente = from pendientes in db.PendientesSet where pendientes.EventoId == id select pendientes;
                foreach (PendientesSet pend in pendiente)
                {
                    db.PendientesSet.Remove(pend);
                }
                db.EventoSet.Remove(eventos);
                db.SaveChanges();
            }
        }

        public void AnularInvitacion(int idUsuario, int idEvento)
        {
            using(var db = new TFGDatabaseContext())
            {
                var delete = (from evento in db.PendientesSet where evento.EventoId == idEvento && evento.UsuarioId == idUsuario select evento).FirstOrDefault();
                db.PendientesSet.Remove(delete);
                db.SaveChanges();
            }
        }

        public EventoSet[] GetEventosInvitado(int id)
        {
            using (var db = new TFGDatabaseContext()) {
                var identificadores = from ides in db.UsuarioEvento1 where ides.Usuario1Id == id select ides.Evento1Id;
                var eventos = from events in db.EventoSet where identificadores.Contains(events.Id) select events;
                List<EventoSet> termList = new List<EventoSet>();
                foreach (EventoSet ev in eventos)
                {
                    termList.Add(ev);
                }

                EventoSet[] listaEventos = termList.ToArray();
                return listaEventos;
            }
                
        }

        public EventoSet[] GetEventosPendientes(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                var identificadores = from ides in db.PendientesSet where ides.UsuarioId == id select ides.EventoId;
                var pendientes = from pendiente in db.EventoSet where identificadores.Contains(pendiente.Id) select pendiente;
                List<EventoSet> listaPendientes = new List<EventoSet>();
                foreach(EventoSet ev in pendientes)
                {
                    listaPendientes.Add(ev);
                }
                EventoSet[] listaEventos = listaPendientes.ToArray();
                return listaEventos;
            }
        }

        public void EditEvento(int id, DateTime fecha, DateTime horaInicio, DateTime horaFinal)
        {
            using(var db = new TFGDatabaseContext())
            {
                var evento = (from eventS in db.EventoSet where eventS.Id == id select eventS).FirstOrDefault();
                evento.Fecha = fecha;
                evento.HoraInicio = horaInicio;
                evento.HoraFin = horaFinal;
                db.SaveChanges();
            }
            //throw new System.NotImplementedException();
        }

        public void CompartirEvento(int idEvento, int idUsuario)
        {
            using (var db = new TFGDatabaseContext())
            {
                var nuevoPendiente = new PendientesSet();
                nuevoPendiente.EventoId = idEvento;
                nuevoPendiente.UsuarioId = idUsuario;
                db.PendientesSet.Add(nuevoPendiente);
                db.SaveChanges();
            }
        }

        public void AceptarEvento(int idEvento, int idUsuario)
        {
            using(var db = new TFGDatabaseContext())
            {
                var nuevoEvento = new UsuarioEvento1();
                nuevoEvento.Evento1Id = idEvento;
                nuevoEvento.Usuario1Id = idUsuario;
                db.UsuarioEvento1.Add(nuevoEvento);
                db.SaveChanges();
            }
        }

        public void CancelarEvento(int idEvento, int idUsuario)
        {
            using (var db = new TFGDatabaseContext())
            {
                var deleted = (from asistencia in db.UsuarioEvento1 where asistencia.Evento1Id == idEvento && asistencia.Usuario1Id == idUsuario select asistencia).FirstOrDefault();
                db.UsuarioEvento1.Remove(deleted);
                db.SaveChanges();
            }
        }

        public string[] ListaInvitados(int idEvento)
        {
            using (var db = new TFGDatabaseContext())
            {
                var indices = from eventos in db.UsuarioEvento1
                    where eventos.Evento1Id == idEvento
                    select eventos.Usuario1Id;
                var usuarios = from usuario in db.UsuarioSet
                    where indices.Contains(usuario.Id)
                    select usuario.NombreUsuario;
                List<String> listaPendientes = new List<String>();
                foreach (String ev in usuarios)
                {
                    listaPendientes.Add(ev);
                }
                String[] listaEventos = listaPendientes.ToArray();
                return listaEventos;
            }
        }
    }
}