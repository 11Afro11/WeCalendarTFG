using System;
using System.Collections.Generic;

namespace DalModel
{
    public partial class UsuarioSet
    {
        public UsuarioSet()
        {
            BaneoSet = new HashSet<BaneoSet>();
            EventoSet = new HashSet<EventoSet>();
            GrupoSet = new HashSet<GrupoSet>();
            ListaGrupoSet = new HashSet<ListaGrupoSet>();
            MensajeSet = new HashSet<MensajeSet>();
            NotaSet = new HashSet<NotaSet>();
            PendientesSet = new HashSet<PendientesSet>();
            UsuarioAmigoSetUsuario = new HashSet<UsuarioAmigoSet>();
            UsuarioAmigoSetUsuarioId1Navigation = new HashSet<UsuarioAmigoSet>();
            UsuarioEvento1 = new HashSet<UsuarioEvento1>();
        }

        public int Id { get; set; }
        public string NombreUsuario { get; set; }
        public string Correo { get; set; }
        public string Password { get; set; }
        public string Notificacion { get; set; }
        public string Foto { get; set; }
        public DateTime CreateDate { get; set; }
        public string Token { get; set; }

        public ICollection<BaneoSet> BaneoSet { get; set; }
        public ICollection<EventoSet> EventoSet { get; set; }
        public ICollection<GrupoSet> GrupoSet { get; set; }
        public ICollection<ListaGrupoSet> ListaGrupoSet { get; set; }
        public ICollection<MensajeSet> MensajeSet { get; set; }
        public ICollection<NotaSet> NotaSet { get; set; }
        public ICollection<PendientesSet> PendientesSet { get; set; }
        public ICollection<UsuarioAmigoSet> UsuarioAmigoSetUsuario { get; set; }
        public ICollection<UsuarioAmigoSet> UsuarioAmigoSetUsuarioId1Navigation { get; set; }
        public ICollection<UsuarioEvento1> UsuarioEvento1 { get; set; }
    }
}
