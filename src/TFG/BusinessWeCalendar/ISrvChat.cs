using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvChat
    {
        MensajeSet[] GetMensajes(int idUser);
        void InsertarMensaje(JSONMsg mensaje);
    }
}