using System;
using System.Collections.Generic;
using System.Linq;
using DalModel;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Remotion.Linq.Clauses;

namespace DalWeCalendar
{
    public class DalNota : DalBase<NotaSet>, IDalNota
    {
        public NotaSet[] GetNotaSet(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                var notas = from nota in db.NotaSet where nota.UsuarioId == id select nota;

                List<NotaSet> termList = new List<NotaSet>();
                foreach (NotaSet ev in notas)
                {
                    termList.Add(ev);
                }

                NotaSet[] listaEventos = termList.ToArray();
                return listaEventos;
            }
        }

        public NotaSet[] GetNotaByGroup(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                var notas = from nota in db.NotaSet where nota.TableroId == id select nota;
                List<NotaSet> termList = new List<NotaSet>();
                foreach (NotaSet ev in notas)
                {
                    termList.Add(ev);
                }

                NotaSet[] listaEventos = termList.ToArray();
                return listaEventos;
            }
        }

        public NotaSet[] GetNotas()
        {
            using (var db = new TFGDatabaseContext())
            {
                var notas = from nota in db.NotaSet select nota;
                return notas.ToArray();
            }
        }

        public void NuevaNota(NotaSet note)
        {
            using (var db = new TFGDatabaseContext())
            {
                db.NotaSet.Add(note);
                db.SaveChanges();
            }
        }

        public void DeleteNota(int id)
        {
            using (var db = new TFGDatabaseContext())
            {
                var delNote = (from nota in db.NotaSet where nota.Id == id select nota).FirstOrDefault();
                db.NotaSet.Remove(delNote);
                db.SaveChanges();
            }
        }
    }
}