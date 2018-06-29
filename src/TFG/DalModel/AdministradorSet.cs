using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class AdministradorSet
    {
        public AdministradorSet()
        {
            BaneoSet = new HashSet<BaneoSet>();
            EventoSuspendidoSet = new HashSet<EventoSuspendidoSet>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Dni { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public DateTime CreateDate { get; set; }

        public ICollection<BaneoSet> BaneoSet { get; set; }
        public ICollection<EventoSuspendidoSet> EventoSuspendidoSet { get; set; }
    }
}
