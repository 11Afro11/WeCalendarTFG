using System;
using DalModel;

namespace DalWeCalendar
{
    public interface IDalNota
    {
        NotaSet[] GetNotaSet(int id);
        NotaSet[] GetNotaByGroup(int id);
        void NuevaNota(NotaSet note);
        void DeleteNota(int id);
    }
}