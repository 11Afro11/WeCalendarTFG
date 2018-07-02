using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;


namespace BusinessWeCalendar
{
    public interface ISrvEvents
    {
        EventoSet[] GetEventoCreador(int id);

        EventoSet[] GetEventosAsistencia(int id);

        void AddEvento(JSONEvento evento);

        void RemoveEvento(int id);
    }
}