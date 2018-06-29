using DalModel;

namespace DalWeCalendar
{
    public interface IDalEventos
    {
        EventoSet[] GetEventoCreador(int id);

        void AddEvento(EventoSet evento);
        
    }   

}