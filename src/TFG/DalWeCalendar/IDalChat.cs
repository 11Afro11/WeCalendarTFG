using System;
using DalModel;

namespace DalWeCalendar
{
    public interface IDalChat
    {
        MensajeSet[] GetMensajes(int idUser);
        void InsertarMensaje(MensajeSet mensaje);
        UsuarioSet[] GetParticipantes(int idGrupo);
        TableroSet[] ListaTableros();
        int[] ListaChat(int idUsuario);
        GrupoSet[] ListaGrupos(int idUsuario);
        void CrearGrupo(GrupoSet grupo);
        int GetChatID();
        int GetLastGrupID();
        void CreateChat();
        void crearTablero(int idGrupo);
        void AniadirAlGrupo(int idUsuario, int idGrupo);
        void deleteGrupo(int idGrupo);

    }
}