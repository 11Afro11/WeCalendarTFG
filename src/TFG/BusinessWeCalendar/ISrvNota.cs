using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvNota
    {
        NotaSet[] GetNota(int id);
        void NuevaNota(JSONNota note);
        void DeleteNota(int id);
    }
}