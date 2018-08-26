using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvNota
    {
        NotaSet[] GetNota(int id);
        NotaSet[] GetNotaByGroup(int id);
        NotaSet[] GetNotas();
        void NuevaNota(JSONNota note);
        void NuevaNotaTablero(JSONNotaTablero note);
        void DeleteNota(int id);
        
    }
}