using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;
using DalWeCalendar;

namespace BusinessWeCalendar
{
    public class SrvNota : SrvBase, ISrvNota
    {
        private readonly IDalNota _dalNota;
        public SrvNota(IDalNota dalNota)
        {
            _dalNota = dalNota ?? throw new ArgumentNullException(nameof(dalNota));
        }

        public NotaSet[] GetNota(int id)
        {
            return _dalNota.GetNotaSet(id);
        }

        public NotaSet[] GetNotaByGroup(int id)
        {
            return _dalNota.GetNotaByGroup(id);
        }

        public void NuevaNota(JSONNota note)
        {
            NotaSet nota = new NotaSet();
            nota.Titulo = note.titulo;
            nota.Texto = note.texto;
            nota.UsuarioId = note.usuarioId;
            nota.FechaTope = note.fechaTope;
            nota.CreateDate = note.createDate;
            _dalNota.NuevaNota(nota);
        }

        public void NuevaNotaTablero(JSONNotaTablero note)
        {
            NotaSet nota = new NotaSet();
            nota.Titulo = note.titulo;
            nota.Texto = note.texto;
            nota.UsuarioId = note.usuarioId;
            nota.FechaTope = note.fechaTope;
            nota.CreateDate = note.createDate;
            nota.TableroId = note.tableroId;
            _dalNota.NuevaNota(nota);
        }

        public void DeleteNota(int id)
        {
            _dalNota.DeleteNota(id);
        }
    }
}