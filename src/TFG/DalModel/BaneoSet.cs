using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class BaneoSet
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int AdministradorId { get; set; }
        public int UsuarioId { get; set; }

        public AdministradorSet Administrador { get; set; }
        public UsuarioSet Usuario { get; set; }
    }
}
