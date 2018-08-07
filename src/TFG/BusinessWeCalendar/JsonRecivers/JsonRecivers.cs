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

    public class JSONEditEvent
    {
        public DateTime horaInicio { get; set; }
        public DateTime horafin { get; set; }
        public DateTime fecha { get; set; }
    }

    public class JSONPendiente
    {
        public int idEvento { get; set; }
        public int idUsuario { get; set; }
    }

    public class JSONNota
    {
        public string titulo { get; set; }
        public string texto { get; set; }
        public DateTime fechaTope { get; set; }
        public DateTime createDate { get; set; }
        public int usuarioId { get; set; }

    }

    public class JSONNotaTablero
    {
        public string titulo { get; set; }
        public string texto { get; set; }
        public DateTime fechaTope { get; set; }
        public DateTime createDate { get; set; }
        public int usuarioId { get; set; }
        public int tableroId { get; set; }
    }

    public class JSONMsg
    {
        public string texto { get; set; }
        public int grupoId { get; set; }
        public DateTime createDate {get; set; }
        public int usuarioId { get; set; }
        public int chatId { get; set; }
    }
}