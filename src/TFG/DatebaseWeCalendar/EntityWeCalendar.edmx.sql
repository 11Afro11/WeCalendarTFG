
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/25/2018 15:26:42
-- Generated from EDMX file: E:\GoogleDrive\Informática\4-CUARTO\TFG\src\TFG\DatebaseWeCalendar\EntityWeCalendar.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [TFGDatabase];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_CreaEvento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[EventoSet] DROP CONSTRAINT [FK_CreaEvento];
GO
IF OBJECT_ID(N'[dbo].[FK_Calendario_Usuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UsuarioEvento1] DROP CONSTRAINT [FK_Calendario_Usuario];
GO
IF OBJECT_ID(N'[dbo].[FK_Calendario_Evento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UsuarioEvento1] DROP CONSTRAINT [FK_Calendario_Evento];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioUsuarioAmigo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UsuarioAmigoSet] DROP CONSTRAINT [FK_UsuarioUsuarioAmigo];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioUsuarioAmigo1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UsuarioAmigoSet] DROP CONSTRAINT [FK_UsuarioUsuarioAmigo1];
GO
IF OBJECT_ID(N'[dbo].[FK_GrupoChat]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GrupoSet] DROP CONSTRAINT [FK_GrupoChat];
GO
IF OBJECT_ID(N'[dbo].[FK_GrupoTablero]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GrupoSet] DROP CONSTRAINT [FK_GrupoTablero];
GO
IF OBJECT_ID(N'[dbo].[FK_TableroNota]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NotaSet] DROP CONSTRAINT [FK_TableroNota];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioNota]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NotaSet] DROP CONSTRAINT [FK_UsuarioNota];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioListaGrupo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ListaGrupoSet] DROP CONSTRAINT [FK_UsuarioListaGrupo];
GO
IF OBJECT_ID(N'[dbo].[FK_GrupoListaGrupo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ListaGrupoSet] DROP CONSTRAINT [FK_GrupoListaGrupo];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioGrupo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GrupoSet] DROP CONSTRAINT [FK_UsuarioGrupo];
GO
IF OBJECT_ID(N'[dbo].[FK_AdministradorBaneo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[BaneoSet] DROP CONSTRAINT [FK_AdministradorBaneo];
GO
IF OBJECT_ID(N'[dbo].[FK_AdministradorEventoSuspendido]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[EventoSuspendidoSet] DROP CONSTRAINT [FK_AdministradorEventoSuspendido];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioMensaje]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MensajeSet] DROP CONSTRAINT [FK_UsuarioMensaje];
GO
IF OBJECT_ID(N'[dbo].[FK_ChatMensaje]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MensajeSet] DROP CONSTRAINT [FK_ChatMensaje];
GO
IF OBJECT_ID(N'[dbo].[FK_UsuarioPendientes]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PendientesSet] DROP CONSTRAINT [FK_UsuarioPendientes];
GO
IF OBJECT_ID(N'[dbo].[FK_BaneoUsuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[BaneoSet] DROP CONSTRAINT [FK_BaneoUsuario];
GO
IF OBJECT_ID(N'[dbo].[FK_PendientesEvento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PendientesSet] DROP CONSTRAINT [FK_PendientesEvento];
GO
IF OBJECT_ID(N'[dbo].[FK_EventoSuspendidoEvento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[EventoSuspendidoSet] DROP CONSTRAINT [FK_EventoSuspendidoEvento];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[UsuarioSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UsuarioSet];
GO
IF OBJECT_ID(N'[dbo].[EventoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[EventoSet];
GO
IF OBJECT_ID(N'[dbo].[AdministradorSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AdministradorSet];
GO
IF OBJECT_ID(N'[dbo].[MensajeSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MensajeSet];
GO
IF OBJECT_ID(N'[dbo].[GrupoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GrupoSet];
GO
IF OBJECT_ID(N'[dbo].[NotaSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NotaSet];
GO
IF OBJECT_ID(N'[dbo].[BaneoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BaneoSet];
GO
IF OBJECT_ID(N'[dbo].[EventoSuspendidoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[EventoSuspendidoSet];
GO
IF OBJECT_ID(N'[dbo].[UsuarioAmigoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UsuarioAmigoSet];
GO
IF OBJECT_ID(N'[dbo].[ListaGrupoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ListaGrupoSet];
GO
IF OBJECT_ID(N'[dbo].[ChatSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ChatSet];
GO
IF OBJECT_ID(N'[dbo].[TableroSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TableroSet];
GO
IF OBJECT_ID(N'[dbo].[PendientesSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PendientesSet];
GO
IF OBJECT_ID(N'[dbo].[UsuarioEvento1]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UsuarioEvento1];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'UsuarioSet'
CREATE TABLE [dbo].[UsuarioSet] (
    [id] int IDENTITY(1,1) NOT NULL,
    [nombreUsuario] nchar(30)  NOT NULL,
    [correo] nvarchar(max)  NOT NULL,
    [password] nvarchar(max)  NOT NULL,
    [notificacion] nvarchar(max)  NOT NULL,
    [foto] nvarchar(max)  NULL,
    [CreateDate] datetime  NOT NULL,
    [token] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'EventoSet'
CREATE TABLE [dbo].[EventoSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombre] nvarchar(max)  NOT NULL,
    [descripcion] nvarchar(max)  NULL,
    [direccion] nvarchar(max)  NULL,
    [horaInicio] datetime  NOT NULL,
    [horaFin] datetime  NOT NULL,
    [fecha] datetime  NOT NULL,
    [prioridad] int  NOT NULL,
    [visibilidad] bit  NOT NULL,
    [CreateDate] datetime  NOT NULL,
    [Usuario_id] int  NOT NULL
);
GO

-- Creating table 'AdministradorSet'
CREATE TABLE [dbo].[AdministradorSet] (
    [id] int IDENTITY(1,1) NOT NULL,
    [nombre] nchar(90)  NOT NULL,
    [dni] nvarchar(max)  NOT NULL,
    [correo] nvarchar(max)  NOT NULL,
    [password] nvarchar(max)  NOT NULL,
    [CreateDate] datetime  NOT NULL
);
GO

-- Creating table 'MensajeSet'
CREATE TABLE [dbo].[MensajeSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [texto] nvarchar(max)  NOT NULL,
    [GrupoId] int  NOT NULL,
    [CreateDate] nvarchar(max)  NOT NULL,
    [Usuario_id] int  NOT NULL,
    [ChatId] int  NOT NULL
);
GO

-- Creating table 'GrupoSet'
CREATE TABLE [dbo].[GrupoSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [nombre] nvarchar(max)  NOT NULL,
    [descripcion] nvarchar(max)  NULL,
    [imagen] nvarchar(max)  NULL,
    [CreateDate] datetime  NOT NULL,
    [Usuario_id] int  NOT NULL,
    [Chat_Id] int  NOT NULL,
    [Tablero_Id] int  NOT NULL
);
GO

-- Creating table 'NotaSet'
CREATE TABLE [dbo].[NotaSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [titulo] nvarchar(max)  NULL,
    [texto] nvarchar(max)  NULL,
    [fechaTope] datetime  NOT NULL,
    [CreateDate] datetime  NOT NULL,
    [TableroId] int  NOT NULL,
    [Usuario_id] int  NOT NULL
);
GO

-- Creating table 'BaneoSet'
CREATE TABLE [dbo].[BaneoSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CreateDate] datetime  NOT NULL,
    [Administrador_id] int  NOT NULL,
    [Usuario_id] int  NOT NULL
);
GO

-- Creating table 'EventoSuspendidoSet'
CREATE TABLE [dbo].[EventoSuspendidoSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CreateDate] datetime  NOT NULL,
    [Administrador_id] int  NOT NULL,
    [Evento_Id] int  NOT NULL
);
GO

-- Creating table 'UsuarioAmigoSet'
CREATE TABLE [dbo].[UsuarioAmigoSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CreateDate] datetime  NOT NULL,
    [Usuario_id] int  NOT NULL,
    [Usuario_id1] int  NOT NULL
);
GO

-- Creating table 'ListaGrupoSet'
CREATE TABLE [dbo].[ListaGrupoSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CreateDate] datetime  NOT NULL,
    [Usuario_id] int  NOT NULL,
    [GrupoId] int  NOT NULL
);
GO

-- Creating table 'ChatSet'
CREATE TABLE [dbo].[ChatSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CreateDate] datetime  NOT NULL
);
GO

-- Creating table 'TableroSet'
CREATE TABLE [dbo].[TableroSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CreateDate] datetime  NOT NULL
);
GO

-- Creating table 'PendientesSet'
CREATE TABLE [dbo].[PendientesSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Usuario_id] int  NOT NULL,
    [Evento_Id] int  NOT NULL
);
GO

-- Creating table 'UsuarioEvento1'
CREATE TABLE [dbo].[UsuarioEvento1] (
    [Usuario1_id] int  NOT NULL,
    [Evento1_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [id] in table 'UsuarioSet'
ALTER TABLE [dbo].[UsuarioSet]
ADD CONSTRAINT [PK_UsuarioSet]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [Id] in table 'EventoSet'
ALTER TABLE [dbo].[EventoSet]
ADD CONSTRAINT [PK_EventoSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [id] in table 'AdministradorSet'
ALTER TABLE [dbo].[AdministradorSet]
ADD CONSTRAINT [PK_AdministradorSet]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [Id] in table 'MensajeSet'
ALTER TABLE [dbo].[MensajeSet]
ADD CONSTRAINT [PK_MensajeSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'GrupoSet'
ALTER TABLE [dbo].[GrupoSet]
ADD CONSTRAINT [PK_GrupoSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'NotaSet'
ALTER TABLE [dbo].[NotaSet]
ADD CONSTRAINT [PK_NotaSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'BaneoSet'
ALTER TABLE [dbo].[BaneoSet]
ADD CONSTRAINT [PK_BaneoSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'EventoSuspendidoSet'
ALTER TABLE [dbo].[EventoSuspendidoSet]
ADD CONSTRAINT [PK_EventoSuspendidoSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UsuarioAmigoSet'
ALTER TABLE [dbo].[UsuarioAmigoSet]
ADD CONSTRAINT [PK_UsuarioAmigoSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ListaGrupoSet'
ALTER TABLE [dbo].[ListaGrupoSet]
ADD CONSTRAINT [PK_ListaGrupoSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ChatSet'
ALTER TABLE [dbo].[ChatSet]
ADD CONSTRAINT [PK_ChatSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TableroSet'
ALTER TABLE [dbo].[TableroSet]
ADD CONSTRAINT [PK_TableroSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'PendientesSet'
ALTER TABLE [dbo].[PendientesSet]
ADD CONSTRAINT [PK_PendientesSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Usuario1_id], [Evento1_Id] in table 'UsuarioEvento1'
ALTER TABLE [dbo].[UsuarioEvento1]
ADD CONSTRAINT [PK_UsuarioEvento1]
    PRIMARY KEY CLUSTERED ([Usuario1_id], [Evento1_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Usuario_id] in table 'EventoSet'
ALTER TABLE [dbo].[EventoSet]
ADD CONSTRAINT [FK_CreaEvento]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CreaEvento'
CREATE INDEX [IX_FK_CreaEvento]
ON [dbo].[EventoSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [Usuario1_id] in table 'UsuarioEvento1'
ALTER TABLE [dbo].[UsuarioEvento1]
ADD CONSTRAINT [FK_Calendario_Usuario]
    FOREIGN KEY ([Usuario1_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Evento1_Id] in table 'UsuarioEvento1'
ALTER TABLE [dbo].[UsuarioEvento1]
ADD CONSTRAINT [FK_Calendario_Evento]
    FOREIGN KEY ([Evento1_Id])
    REFERENCES [dbo].[EventoSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Calendario_Evento'
CREATE INDEX [IX_FK_Calendario_Evento]
ON [dbo].[UsuarioEvento1]
    ([Evento1_Id]);
GO

-- Creating foreign key on [Usuario_id] in table 'UsuarioAmigoSet'
ALTER TABLE [dbo].[UsuarioAmigoSet]
ADD CONSTRAINT [FK_UsuarioUsuarioAmigo]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioUsuarioAmigo'
CREATE INDEX [IX_FK_UsuarioUsuarioAmigo]
ON [dbo].[UsuarioAmigoSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [Usuario_id1] in table 'UsuarioAmigoSet'
ALTER TABLE [dbo].[UsuarioAmigoSet]
ADD CONSTRAINT [FK_UsuarioUsuarioAmigo1]
    FOREIGN KEY ([Usuario_id1])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioUsuarioAmigo1'
CREATE INDEX [IX_FK_UsuarioUsuarioAmigo1]
ON [dbo].[UsuarioAmigoSet]
    ([Usuario_id1]);
GO

-- Creating foreign key on [Chat_Id] in table 'GrupoSet'
ALTER TABLE [dbo].[GrupoSet]
ADD CONSTRAINT [FK_GrupoChat]
    FOREIGN KEY ([Chat_Id])
    REFERENCES [dbo].[ChatSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GrupoChat'
CREATE INDEX [IX_FK_GrupoChat]
ON [dbo].[GrupoSet]
    ([Chat_Id]);
GO

-- Creating foreign key on [Tablero_Id] in table 'GrupoSet'
ALTER TABLE [dbo].[GrupoSet]
ADD CONSTRAINT [FK_GrupoTablero]
    FOREIGN KEY ([Tablero_Id])
    REFERENCES [dbo].[TableroSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GrupoTablero'
CREATE INDEX [IX_FK_GrupoTablero]
ON [dbo].[GrupoSet]
    ([Tablero_Id]);
GO

-- Creating foreign key on [TableroId] in table 'NotaSet'
ALTER TABLE [dbo].[NotaSet]
ADD CONSTRAINT [FK_TableroNota]
    FOREIGN KEY ([TableroId])
    REFERENCES [dbo].[TableroSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TableroNota'
CREATE INDEX [IX_FK_TableroNota]
ON [dbo].[NotaSet]
    ([TableroId]);
GO

-- Creating foreign key on [Usuario_id] in table 'NotaSet'
ALTER TABLE [dbo].[NotaSet]
ADD CONSTRAINT [FK_UsuarioNota]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioNota'
CREATE INDEX [IX_FK_UsuarioNota]
ON [dbo].[NotaSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [Usuario_id] in table 'ListaGrupoSet'
ALTER TABLE [dbo].[ListaGrupoSet]
ADD CONSTRAINT [FK_UsuarioListaGrupo]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioListaGrupo'
CREATE INDEX [IX_FK_UsuarioListaGrupo]
ON [dbo].[ListaGrupoSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [GrupoId] in table 'ListaGrupoSet'
ALTER TABLE [dbo].[ListaGrupoSet]
ADD CONSTRAINT [FK_GrupoListaGrupo]
    FOREIGN KEY ([GrupoId])
    REFERENCES [dbo].[GrupoSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GrupoListaGrupo'
CREATE INDEX [IX_FK_GrupoListaGrupo]
ON [dbo].[ListaGrupoSet]
    ([GrupoId]);
GO

-- Creating foreign key on [Usuario_id] in table 'GrupoSet'
ALTER TABLE [dbo].[GrupoSet]
ADD CONSTRAINT [FK_UsuarioGrupo]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioGrupo'
CREATE INDEX [IX_FK_UsuarioGrupo]
ON [dbo].[GrupoSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [Administrador_id] in table 'BaneoSet'
ALTER TABLE [dbo].[BaneoSet]
ADD CONSTRAINT [FK_AdministradorBaneo]
    FOREIGN KEY ([Administrador_id])
    REFERENCES [dbo].[AdministradorSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AdministradorBaneo'
CREATE INDEX [IX_FK_AdministradorBaneo]
ON [dbo].[BaneoSet]
    ([Administrador_id]);
GO

-- Creating foreign key on [Administrador_id] in table 'EventoSuspendidoSet'
ALTER TABLE [dbo].[EventoSuspendidoSet]
ADD CONSTRAINT [FK_AdministradorEventoSuspendido]
    FOREIGN KEY ([Administrador_id])
    REFERENCES [dbo].[AdministradorSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AdministradorEventoSuspendido'
CREATE INDEX [IX_FK_AdministradorEventoSuspendido]
ON [dbo].[EventoSuspendidoSet]
    ([Administrador_id]);
GO

-- Creating foreign key on [Usuario_id] in table 'MensajeSet'
ALTER TABLE [dbo].[MensajeSet]
ADD CONSTRAINT [FK_UsuarioMensaje]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioMensaje'
CREATE INDEX [IX_FK_UsuarioMensaje]
ON [dbo].[MensajeSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [ChatId] in table 'MensajeSet'
ALTER TABLE [dbo].[MensajeSet]
ADD CONSTRAINT [FK_ChatMensaje]
    FOREIGN KEY ([ChatId])
    REFERENCES [dbo].[ChatSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ChatMensaje'
CREATE INDEX [IX_FK_ChatMensaje]
ON [dbo].[MensajeSet]
    ([ChatId]);
GO

-- Creating foreign key on [Usuario_id] in table 'PendientesSet'
ALTER TABLE [dbo].[PendientesSet]
ADD CONSTRAINT [FK_UsuarioPendientes]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UsuarioPendientes'
CREATE INDEX [IX_FK_UsuarioPendientes]
ON [dbo].[PendientesSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [Usuario_id] in table 'BaneoSet'
ALTER TABLE [dbo].[BaneoSet]
ADD CONSTRAINT [FK_BaneoUsuario]
    FOREIGN KEY ([Usuario_id])
    REFERENCES [dbo].[UsuarioSet]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_BaneoUsuario'
CREATE INDEX [IX_FK_BaneoUsuario]
ON [dbo].[BaneoSet]
    ([Usuario_id]);
GO

-- Creating foreign key on [Evento_Id] in table 'PendientesSet'
ALTER TABLE [dbo].[PendientesSet]
ADD CONSTRAINT [FK_PendientesEvento]
    FOREIGN KEY ([Evento_Id])
    REFERENCES [dbo].[EventoSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PendientesEvento'
CREATE INDEX [IX_FK_PendientesEvento]
ON [dbo].[PendientesSet]
    ([Evento_Id]);
GO

-- Creating foreign key on [Evento_Id] in table 'EventoSuspendidoSet'
ALTER TABLE [dbo].[EventoSuspendidoSet]
ADD CONSTRAINT [FK_EventoSuspendidoEvento]
    FOREIGN KEY ([Evento_Id])
    REFERENCES [dbo].[EventoSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_EventoSuspendidoEvento'
CREATE INDEX [IX_FK_EventoSuspendidoEvento]
ON [dbo].[EventoSuspendidoSet]
    ([Evento_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------