using System;
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
    }
}