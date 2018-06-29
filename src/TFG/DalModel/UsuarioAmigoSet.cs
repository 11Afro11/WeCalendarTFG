using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class UsuarioAmigoSet
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int UsuarioId { get; set; }
        public int UsuarioId1 { get; set; }

        public UsuarioSet Usuario { get; set; }
        public UsuarioSet UsuarioId1Navigation { get; set; }
    }
}
