using DalModel;
using System;

namespace DalWeCalendar
{
    public interface IDalEventos
    {
        EventoSet[] GetEventoCreador(int id);

        EventoSet[] GetEventosInvitado(int id);

        EventoSet[] GetEventosPendientes(int id);

        void AddEvento(EventoSet evento);

        void RemoveEvento(int id);

        void AnularInvitacion(int idUsuario, int idEvento);

        void EditEvento(int id, DateTime fecha, DateTime horaInicio, DateTime horaFinal);

        void CompartirEvento(int idEvento, int idUsuario);

        void AceptarEvento(int idEvento, int idUsuario);

        void CancelarEvento(int idEvento, int idUsuario);
        
    }   

}