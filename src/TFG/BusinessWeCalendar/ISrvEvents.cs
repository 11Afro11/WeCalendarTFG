using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;


namespace BusinessWeCalendar
{
    public interface ISrvEvents
    {
        EventoSet[] GetEventoCreador(int id);

        EventoSet[] GetEventosAsistencia(int id);

        EventoSet[] GetListaPendientes(int id);

        EventoSet[] GetEventosPublicos(int id);

        void AddEvento(JSONEvento evento);

        void RemoveEvento(int id);

        void AnularInvitacion(int idUsuario, int idEvento);

        void EditEvento(int id, DateTime fecha, DateTime horaInicio, DateTime horaFin);

        void CompartirEvento(int idEvento, int idUsuario);

        void AceptarInvitacion(int idUsuario, int idEvento);

        void CancelarEvento(int idUsuario, int idEvento);

        String[] ListaAsistentes(int idEvento);

        EventoSet[] GetAllEvents();

        UsuarioEvento1[] listaAsistentes();
    }
}