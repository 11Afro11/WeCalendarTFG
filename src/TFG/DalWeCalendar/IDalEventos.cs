using DalModel;
using System;

namespace DalWeCalendar
{
    public interface IDalEventos
    {
        EventoSet[] GetEventoCreador(int id);

        EventoSet[] GetEventosInvitado(int id);

        void AddEvento(EventoSet evento);

        void RemoveEvento(int id);

        void EditEvento(int id, DateTime fecha, DateTime horaInicio, DateTime horaFinal);
        
    }   

}