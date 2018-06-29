using System;
using System.Collections.Generic;

namespace TFG
{
    public partial class EventoSet
    {
        public EventoSet()
        {
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
        public int PendientesId { get; set; }
        public int EventoSuspendidoId { get; set; }

        public EventoSuspendidoSet EventoSuspendido { get; set; }
        public PendientesSet Pendientes { get; set; }
        public UsuarioSet Usuario { get; set; }
        public ICollection<UsuarioEvento1> UsuarioEvento1 { get; set; }
    }
}
