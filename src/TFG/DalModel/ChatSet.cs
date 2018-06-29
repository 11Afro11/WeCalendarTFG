using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class ChatSet
    {
        public ChatSet()
        {
            GrupoSet = new HashSet<GrupoSet>();
            MensajeSet = new HashSet<MensajeSet>();
        }

        public int Id { get; set; }
        public DateTime CreateDate { get; set; }

        public ICollection<GrupoSet> GrupoSet { get; set; }
        public ICollection<MensajeSet> MensajeSet { get; set; }
    }
}
