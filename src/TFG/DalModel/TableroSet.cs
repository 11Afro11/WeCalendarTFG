using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class TableroSet
    {
        public TableroSet()
        {
            GrupoSet = new HashSet<GrupoSet>();
            NotaSet = new HashSet<NotaSet>();
        }

        public int Id { get; set; }
        public DateTime CreateDate { get; set; }

        public ICollection<GrupoSet> GrupoSet { get; set; }
        public ICollection<NotaSet> NotaSet { get; set; }
    }
}
