using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class NotaSet
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Texto { get; set; }
        public DateTime FechaTope { get; set; }
        public DateTime CreateDate { get; set; }
        public int TableroId { get; set; }
        public int UsuarioId { get; set; }

        public TableroSet Tablero { get; set; }
        public UsuarioSet Usuario { get; set; }
    }
}
