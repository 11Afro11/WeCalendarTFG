using System;
using DalModel;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DalWeCalendar
{
    public abstract class DalBase<T> where T : class
    {
        protected EntityEntry<T> Add(T element)
        {
            EntityEntry<T> resultado;
            using (var db = new TFGDatabaseContext())
            {
                resultado = db.Add<T>(element);
                db.SaveChanges();
            }

            return resultado;
        }
    }
}