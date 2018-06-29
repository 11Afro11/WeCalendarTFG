using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class MensajeSet
    {
        public int Id { get; set; }
        public string Texto { get; set; }
        public int GrupoId { get; set; }
        public string CreateDate { get; set; }
        public int UsuarioId { get; set; }
        public int ChatId { get; set; }

        public ChatSet Chat { get; set; }
        public UsuarioSet Usuario { get; set; }
    }
}
