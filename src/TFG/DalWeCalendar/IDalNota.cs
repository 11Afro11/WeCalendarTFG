using System;
using DalModel;

namespace DalWeCalendar
{
    public interface IDalNota
    {
        NotaSet[] GetNotaSet(int id);
        void NuevaNota(NotaSet note);
        void DeleteNota(int id);
    }
}