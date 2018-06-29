using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class ListaGrupoSet
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int UsuarioId { get; set; }
        public int GrupoId { get; set; }

        public GrupoSet Grupo { get; set; }
        public UsuarioSet Usuario { get; set; }
    }
}
