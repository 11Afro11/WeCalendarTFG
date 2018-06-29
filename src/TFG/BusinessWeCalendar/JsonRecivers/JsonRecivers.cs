using System;

namespace BackendWeCalendar.Controllers.JsonRecivers
{
    public class JsonRecivers
    {
        
    }

    public class JSONEvento
    {
        public string nombre { get; set; }
        public string desc { get; set; }
        public string direccion { get; set; }
        public DateTime horaInicio { get; set; }
        public DateTime horafin { get; set; }
        public DateTime fecha { get; set; }
        public int prioridad { get; set; }
        public bool visibilidad { get; set; }
        public int idUsuarioDuenio { get; set; }
    }
}