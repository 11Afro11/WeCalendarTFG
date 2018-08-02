using DalModel;

namespace DalWeCalendar
{
    public interface IDalChat
    {
        MensajeSet[] GetMensajes(int idUser);
        void InsertarMensaje(MensajeSet mensaje);
    }
}