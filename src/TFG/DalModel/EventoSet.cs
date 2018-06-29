using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class EventoSet
    {
        public EventoSet()
        {
            EventoSuspendidoSet = new HashSet<EventoSuspendidoSet>();
            PendientesSet = new HashSet<PendientesSet>();
            UsuarioEvento1 = new HashSet<UsuarioEvento1>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFin { get; set; }
        public DateTime Fecha { get; set; }
        public int Prioridad { get; set; }
        public bool Visibilidad { get; set; }
        public DateTime CreateDate { get; set; }
        public int UsuarioId { get; set; }

        public UsuarioSet Usuario { get; set; }
        public ICollection<EventoSuspendidoSet> EventoSuspendidoSet { get; set; }
        public ICollection<PendientesSet> PendientesSet { get; set; }
        public ICollection<UsuarioEvento1> UsuarioEvento1 { get; set; }
    }
}
