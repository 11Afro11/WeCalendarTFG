using System;
using System.Collections.Generic;

namespace TFG
{
    public partial class PendientesSet
    {
        public PendientesSet()
        {
            EventoSet = new HashSet<EventoSet>();
        }

        public int Id { get; set; }
        public int UsuarioId { get; set; }

        public UsuarioSet Usuario { get; set; }
        public ICollection<EventoSet> EventoSet { get; set; }
    }
}
