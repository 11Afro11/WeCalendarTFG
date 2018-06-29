using System;
using System.Collections.Generic;

namespace TFG
{
    public partial class EventoSuspendidoSet
    {
        public EventoSuspendidoSet()
        {
            EventoSet = new HashSet<EventoSet>();
        }

        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int AdministradorId { get; set; }

        public AdministradorSet Administrador { get; set; }
        public ICollection<EventoSet> EventoSet { get; set; }
    }
}
