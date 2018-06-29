using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class EventoSuspendidoSet
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int AdministradorId { get; set; }
        public int EventoId { get; set; }

        public AdministradorSet Administrador { get; set; }
        public EventoSet Evento { get; set; }
    }
}
