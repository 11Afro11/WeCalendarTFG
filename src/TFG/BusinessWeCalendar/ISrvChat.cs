using System;
using BackendWeCalendar.Controllers.JsonRecivers;
using DalModel;

namespace BusinessWeCalendar
{
    public interface ISrvChat
    {
        MensajeSet[] GetMensajes(int idUser);
        void InsertarMensaje(JSONMsg mensaje);
        JSONUserSecure[] UsuariosInGrup(int id);
        void CrearGrupo(string nombreGrupo, string descripcion, int usuarioID);
        TableroSet[] listaTableros();
        int[] listaChat(int idUsuario);
        GrupoSet[] listaGrupos(int idUsuario);
        void AniadirUaurioAgrupo(int idUsuario, int idGrupo);
        void deleteGrupo(int idGrupo);
        ListaGrupoSet[] ListaGruppos();
    }
}