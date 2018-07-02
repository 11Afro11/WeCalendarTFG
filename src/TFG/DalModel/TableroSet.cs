using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class TableroSet
    {
        public TableroSet()
        {
            NotaSet = new HashSet<NotaSet>();
        }

        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int GrupoId { get; set; }

        public GrupoSet Grupo { get; set; }
        public ICollection<NotaSet> NotaSet { get; set; }
    }
}
