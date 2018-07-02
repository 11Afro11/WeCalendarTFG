using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DalModel
{
    public partial class TFGDatabaseContext : DbContext
    {
        public virtual DbSet<AdministradorSet> AdministradorSet { get; set; }
        public virtual DbSet<BaneoSet> BaneoSet { get; set; }
        public virtual DbSet<ChatSet> ChatSet { get; set; }
        public virtual DbSet<EventoSet> EventoSet { get; set; }
        public virtual DbSet<EventoSuspendidoSet> EventoSuspendidoSet { get; set; }
        public virtual DbSet<GrupoSet> GrupoSet { get; set; }
        public virtual DbSet<ListaGrupoSet> ListaGrupoSet { get; set; }
        public virtual DbSet<MensajeSet> MensajeSet { get; set; }
        public virtual DbSet<NotaSet> NotaSet { get; set; }
        public virtual DbSet<PendientesSet> PendientesSet { get; set; }
        public virtual DbSet<TableroSet> TableroSet { get; set; }
        public virtual DbSet<UsuarioAmigoSet> UsuarioAmigoSet { get; set; }
        public virtual DbSet<UsuarioEvento1> UsuarioEvento1 { get; set; }
        public virtual DbSet<UsuarioSet> UsuarioSet { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Data Source = tcp:wecalendar.database.windows.net,1433; Database = TFGDatabase; User ID = afro; Password = @Reibaj666; Encrypt = True; TrustServerCertificate = True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdministradorSet>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnName("correo");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Dni)
                    .IsRequired()
                    .HasColumnName("dni");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("nchar(90)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");
            });

            modelBuilder.Entity<BaneoSet>(entity =>
            {
                entity.HasIndex(e => e.AdministradorId)
                    .HasName("IX_FK_AdministradorBaneo");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_BaneoUsuario");

                entity.Property(e => e.AdministradorId).HasColumnName("Administrador_id");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.HasOne(d => d.Administrador)
                    .WithMany(p => p.BaneoSet)
                    .HasForeignKey(d => d.AdministradorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AdministradorBaneo");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.BaneoSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BaneoUsuario");
            });

            modelBuilder.Entity<ChatSet>(entity =>
            {
                entity.Property(e => e.CreateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<EventoSet>(entity =>
            {
                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_CreaEvento");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.Property(e => e.Direccion).HasColumnName("direccion");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.HoraFin)
                    .HasColumnName("horaFin")
                    .HasColumnType("datetime");

                entity.Property(e => e.HoraInicio)
                    .HasColumnName("horaInicio")
                    .HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre");

                entity.Property(e => e.Prioridad).HasColumnName("prioridad");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.Property(e => e.Visibilidad).HasColumnName("visibilidad");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.EventoSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CreaEvento");
            });

            modelBuilder.Entity<EventoSuspendidoSet>(entity =>
            {
                entity.HasIndex(e => e.AdministradorId)
                    .HasName("IX_FK_AdministradorEventoSuspendido");

                entity.HasIndex(e => e.EventoId)
                    .HasName("IX_FK_EventoSuspendidoEvento");

                entity.Property(e => e.AdministradorId).HasColumnName("Administrador_id");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.EventoId).HasColumnName("Evento_Id");

                entity.HasOne(d => d.Administrador)
                    .WithMany(p => p.EventoSuspendidoSet)
                    .HasForeignKey(d => d.AdministradorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AdministradorEventoSuspendido");

                entity.HasOne(d => d.Evento)
                    .WithMany(p => p.EventoSuspendidoSet)
                    .HasForeignKey(d => d.EventoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventoSuspendidoEvento");
            });

            modelBuilder.Entity<GrupoSet>(entity =>
            {
                entity.HasIndex(e => e.ChatId)
                    .HasName("IX_FK_GrupoChat");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_UsuarioGrupo");

                entity.Property(e => e.ChatId).HasColumnName("Chat_Id");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.Property(e => e.Imagen).HasColumnName("imagen");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.HasOne(d => d.Chat)
                    .WithMany(p => p.GrupoSet)
                    .HasForeignKey(d => d.ChatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GrupoChat");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.GrupoSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioGrupo");
            });

            modelBuilder.Entity<ListaGrupoSet>(entity =>
            {
                entity.HasIndex(e => e.GrupoId)
                    .HasName("IX_FK_GrupoListaGrupo");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_UsuarioListaGrupo");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.ListaGrupoSet)
                    .HasForeignKey(d => d.GrupoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GrupoListaGrupo");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.ListaGrupoSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioListaGrupo");
            });

            modelBuilder.Entity<MensajeSet>(entity =>
            {
                entity.HasIndex(e => e.ChatId)
                    .HasName("IX_FK_ChatMensaje");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_UsuarioMensaje");

                entity.Property(e => e.CreateDate).IsRequired();

                entity.Property(e => e.Texto)
                    .IsRequired()
                    .HasColumnName("texto");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.HasOne(d => d.Chat)
                    .WithMany(p => p.MensajeSet)
                    .HasForeignKey(d => d.ChatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChatMensaje");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.MensajeSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioMensaje");
            });

            modelBuilder.Entity<NotaSet>(entity =>
            {
                entity.HasIndex(e => e.TableroId)
                    .HasName("IX_FK_NotaTablero");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_UsuarioNota");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.FechaTope)
                    .HasColumnName("fechaTope")
                    .HasColumnType("datetime");

                entity.Property(e => e.TableroId).HasColumnName("Tablero_Id");

                entity.Property(e => e.Texto).HasColumnName("texto");

                entity.Property(e => e.Titulo).HasColumnName("titulo");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.HasOne(d => d.Tablero)
                    .WithMany(p => p.NotaSet)
                    .HasForeignKey(d => d.TableroId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NotaTablero");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.NotaSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioNota");
            });

            modelBuilder.Entity<PendientesSet>(entity =>
            {
                entity.HasIndex(e => e.EventoId)
                    .HasName("IX_FK_PendientesEvento");

                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_UsuarioPendientes");

                entity.Property(e => e.EventoId).HasColumnName("Evento_Id");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.HasOne(d => d.Evento)
                    .WithMany(p => p.PendientesSet)
                    .HasForeignKey(d => d.EventoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PendientesEvento");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.PendientesSet)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioPendientes");
            });

            modelBuilder.Entity<TableroSet>(entity =>
            {
                entity.HasIndex(e => e.GrupoId)
                    .HasName("IX_FK_TableroGrupo");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.GrupoId).HasColumnName("Grupo_Id");

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.TableroSet)
                    .HasForeignKey(d => d.GrupoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TableroGrupo");
            });

            modelBuilder.Entity<UsuarioAmigoSet>(entity =>
            {
                entity.HasIndex(e => e.UsuarioId)
                    .HasName("IX_FK_UsuarioUsuarioAmigo");

                entity.HasIndex(e => e.UsuarioId1)
                    .HasName("IX_FK_UsuarioUsuarioAmigo1");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.UsuarioId).HasColumnName("Usuario_id");

                entity.Property(e => e.UsuarioId1).HasColumnName("Usuario_id1");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.UsuarioAmigoSetUsuario)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioUsuarioAmigo");

                entity.HasOne(d => d.UsuarioId1Navigation)
                    .WithMany(p => p.UsuarioAmigoSetUsuarioId1Navigation)
                    .HasForeignKey(d => d.UsuarioId1)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioUsuarioAmigo1");
            });

            modelBuilder.Entity<UsuarioEvento1>(entity =>
            {
                entity.HasKey(e => new { e.Usuario1Id, e.Evento1Id });

                entity.HasIndex(e => e.Evento1Id)
                    .HasName("IX_FK_Calendario_Evento");

                entity.Property(e => e.Usuario1Id).HasColumnName("Usuario1_id");

                entity.Property(e => e.Evento1Id).HasColumnName("Evento1_Id");

                entity.HasOne(d => d.Evento1)
                    .WithMany(p => p.UsuarioEvento1)
                    .HasForeignKey(d => d.Evento1Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Calendario_Evento");

                entity.HasOne(d => d.Usuario1)
                    .WithMany(p => p.UsuarioEvento1)
                    .HasForeignKey(d => d.Usuario1Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Calendario_Usuario");
            });

            modelBuilder.Entity<UsuarioSet>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnName("correo");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Foto).HasColumnName("foto");

                entity.Property(e => e.NombreUsuario)
                    .IsRequired()
                    .HasColumnName("nombreUsuario")
                    .HasColumnType("nchar(30)");

                entity.Property(e => e.Notificacion)
                    .IsRequired()
                    .HasColumnName("notificacion");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasColumnName("token");
            });
        }
    }
}
