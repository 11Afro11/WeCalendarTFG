using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class PendientesSet
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int EventoId { get; set; }

        public EventoSet Evento { get; set; }
        public UsuarioSet Usuario { get; set; }
    }
}
