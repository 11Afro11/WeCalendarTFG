using System;
using System.Collections.Generic;
using System.Linq;
using DalModel;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Remotion.Linq.Clauses;

namespace DalWeCalendar
{
    public class DalChat : DalBase<ChatSet>, IDalChat
    {
        public MensajeSet[] GetMensajes(int idUser)
        {
            using (var db = new TFGDatabaseContext())
            {
                var lista = from grups in db.GrupoSet where grups.UsuarioId == idUser select grups.Id;
                var msg = from mensajes in db.MensajeSet where lista.Contains(mensajes.GrupoId) select mensajes;
                List<MensajeSet> listaPendientes = new List<MensajeSet>();
                foreach (MensajeSet ev in msg)
                {
                    listaPendientes.Add(ev);
                }
                MensajeSet[] listaEventos = listaPendientes.ToArray();
                return listaEventos;
            }
        }

        public void InsertarMensaje(MensajeSet mensaje)
        {
            using (var db = new TFGDatabaseContext())
            {
                db.MensajeSet.Add(mensaje);
                db.SaveChanges();
            }
        }

        public UsuarioSet[] GetParticipantes(int idGrupo)
        {
            using (var db = new TFGDatabaseContext())
            {
                var usuariosID = from grups in db.GrupoSet where grups.Id == idGrupo select grups.UsuarioId;
                var asistentes = from list in db.ListaGrupoSet where list.GrupoId == idGrupo select list.UsuarioId;
                var ur = usuariosID.Concat(asistentes);
                var users = from usuarios in db.UsuarioSet where ur.Contains(usuarios.Id) select usuarios;
                //var asist = from usuarios in db.UsuarioSet where asistentes.Contains(usuarios.Id) select usuarios;
                List < UsuarioSet > listaUasuarios = new List<UsuarioSet>();
                //List < UsuarioSet > listaAsistentes = new List<UsuarioSet>();
                foreach (UsuarioSet u in users)
                {
                    listaUasuarios.Add(u);
                }
                /*foreach (UsuarioSet u in asist)
                {
                    listaAsistentes.Add(u);
                }*/

                //var lista = listaUasuarios.Concat(listaAsistentes);
                return listaUasuarios.ToArray();
            }
        }

        public TableroSet[] ListaTableros()
        {
            using (var db = new TFGDatabaseContext())
            {
                var grupsId = from grups in db.GrupoSet select grups.Id;
                var tableros = from tab in db.TableroSet where grupsId.Contains(tab.GrupoId) select tab;
                return tableros.ToArray();
            }
        }

        public int[] ListaChat(int idUsuario)
        {
            using (var db = new TFGDatabaseContext())
            {
                var grupsId = from grups in db.GrupoSet where grups.UsuarioId == idUsuario select grups.ChatId;
                return grupsId.ToArray();
            }
        }

        public GrupoSet[] ListaGrupos(int idUsuario)
        {
            using (var db = new TFGDatabaseContext())
            {
                var grupos = from grupo in db.GrupoSet where grupo.UsuarioId == idUsuario select grupo;
                return grupos.ToArray();
            }
        }

        public void CrearGrupo(GrupoSet grupo)
        {
            using (var db = new TFGDatabaseContext())
            {
                db.GrupoSet.Add(grupo);
                db.SaveChanges();
            }
        }

        public int GetChatID()
        {
            using (var db = new TFGDatabaseContext())
            {
                var invoice = db.ChatSet.OrderByDescending(s => s.Id)
                    .FirstOrDefault();
                return invoice.Id;
            }
            
        }

        public int GetLastGrupID()
        {
            using (var db = new TFGDatabaseContext())
            {
                var invoice = db.GrupoSet.OrderByDescending(s => s.Id)
                    .FirstOrDefault();
                return invoice.Id;
            }
        }

        public void CreateChat()
        {
            using (var db = new TFGDatabaseContext())
            {
                ChatSet chat = new ChatSet();
                chat.CreateDate = DateTime.Today;
                db.ChatSet.Add(chat);
                db.SaveChanges();
            }
        }

        public void crearTablero(int idGrupo)
        {
            using (var db = new TFGDatabaseContext())
            {
                TableroSet tab = new TableroSet();
                tab.GrupoId = idGrupo;
                tab.CreateDate = DateTime.Today;
                db.TableroSet.Add(tab);
                db.SaveChanges();
            }
        }

        public void AniadirAlGrupo(int idUsuario, int idGrupo)
        {
            using (var db = new TFGDatabaseContext())
            {
                ListaGrupoSet lista = new ListaGrupoSet();
                lista.GrupoId = idGrupo;
                lista.UsuarioId = idUsuario;
                lista.CreateDate = new DateTime();
                db.ListaGrupoSet.Add(lista);
                db.SaveChanges();
            }
        }

        public void deleteGrupo(int idGrupo)
        {
            using (var db = new TFGDatabaseContext())
            {
                var grupo = (from grup in db.GrupoSet where grup.Id == idGrupo select grup).FirstOrDefault();
                db.GrupoSet.Remove(grupo);
                db.SaveChanges();
            }
        }
    }
}