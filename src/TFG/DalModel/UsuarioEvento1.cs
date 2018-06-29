using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class UsuarioEvento1
    {
        public int Usuario1Id { get; set; }
        public int Evento1Id { get; set; }

        public EventoSet Evento1 { get; set; }
        public UsuarioSet Usuario1 { get; set; }
    }
}
