using DalModel;

namespace DalWeCalendar
{
    public interface IDalEventos
    {
        EventoSet[] GetEventoCreador(int id);

        EventoSet[] GetEventosInvitado(int id);

        void AddEvento(EventoSet evento);

        void RemoveEvento(int id);
        
    }   

}