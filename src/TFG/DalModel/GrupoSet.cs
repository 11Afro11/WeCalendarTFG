using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class GrupoSet
    {
        public GrupoSet()
        {
            ListaGrupoSet = new HashSet<ListaGrupoSet>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public DateTime CreateDate { get; set; }
        public int UsuarioId { get; set; }
        public int ChatId { get; set; }
        public int TableroId { get; set; }

        public ChatSet Chat { get; set; }
        public TableroSet Tablero { get; set; }
        public UsuarioSet Usuario { get; set; }
        public ICollection<ListaGrupoSet> ListaGrupoSet { get; set; }
    }
}
