﻿using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;
using DalWeCalendar;

namespace BusinessWeCalendar
{
    public class SrvEvent : SrvBase, ISrvEvents
    {
        private readonly IDalEventos _dalEvents;

        public SrvEvent(IDalEventos dalEvent)
        {
            _dalEvents = dalEvent ?? throw new ArgumentNullException(nameof(dalEvent));
        }

        public EventoSet[] GetEventoCreador(int id)
        {
            return _dalEvents.GetEventoCreador(id);
        }

        public EventoSet[] GetEventosAsistencia(int id)
        {
            return _dalEvents.GetEventosInvitado(id);
        }

        public EventoSet[] GetListaPendientes(int id)
        {
            return _dalEvents.GetEventosPendientes(id);
        }

        public EventoSet[] GetEventosPublicos(int id)
        {
            return _dalEvents.GetEventosPublicos(id);
        }

        public void AddEvento(JSONEvento evento)
        {
            EventoSet nuevoEvento = new EventoSet();
            nuevoEvento.Nombre = evento.nombre;
            nuevoEvento.Descripcion = evento.desc;
            nuevoEvento.Direccion = evento.direccion;
            nuevoEvento.HoraInicio = evento.horaInicio;
            nuevoEvento.HoraFin = evento.horafin;
            nuevoEvento.Fecha = evento.fecha;
            nuevoEvento.Prioridad = evento.prioridad;
            nuevoEvento.Visibilidad = evento.visibilidad;
            nuevoEvento.UsuarioId = evento.idUsuarioDuenio;
            nuevoEvento.CreateDate = evento.fecha;
            _dalEvents.AddEvento(nuevoEvento);
        }

        public void RemoveEvento(int id)
        {
            _dalEvents.RemoveEvento(id);
        }

        public void EditEvento(int id, DateTime fecha, DateTime horaInicio, DateTime horaFin)
        {
            _dalEvents.EditEvento(id, fecha, horaInicio, horaFin);
            //throw new NotImplementedException();
        }

        public void CompartirEvento(int idEvento, int idUsuario)
        {
            _dalEvents.CompartirEvento(idEvento, idUsuario);
            //throw new NotImplementedException();
        }

        public void AnularInvitacion(int idUsuario, int idEvento)
        {
            _dalEvents.AnularInvitacion(idUsuario, idEvento);
        }

        public void AceptarInvitacion(int idUsuario, int idEvento)
        {
            _dalEvents.AceptarEvento(idEvento, idUsuario);
            _dalEvents.AnularInvitacion(idUsuario, idEvento);
        }

        public void CancelarEvento(int idUsuario, int idEvento)
        {
            _dalEvents.CancelarEvento(idEvento, idUsuario);
        }

        public string[] ListaAsistentes(int idEvento)
        {
            return _dalEvents.ListaInvitados(idEvento);
        }

        public EventoSet[] GetAllEvents()
        {
            return _dalEvents.GetAllEvents();
        }

        public UsuarioEvento1[] listaAsistentes()
        {
            return _dalEvents.GetAsistentes();
        }
    }
}