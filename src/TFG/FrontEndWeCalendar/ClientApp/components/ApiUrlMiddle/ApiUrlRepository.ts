

export module ApiUrlRepository {
    export var getSpecificUser = "getSpecificUser";
    export var getSpecificEvent = "getSpecificEvent";
    export var getEventosPendientes = "getEventosPendientes";
    export var setSpecificEvent = "setSpecificEvent";
    export var getEventoInvitado = "getEventoInvitado";
    export var deleteSpecificEvent = "deleteSpecificEvent";
    export var postSpecificEvent = "postSpecificEvent";
    export var cancelarEvento = "cancelarEvento";
    export var shareEvent = "shareEvent";
    export var editEvent = "editEvent";
    export var eliminarEvento = "eliminarEvento";
    export var getFriends = "getFriends";
    export var eliminarInvitacion = "eliminarInvitacion";
    export var aceptarInvitacion = "aceptarInvitacion";
    export var login = "login";
    export var token = "token";
    export var publicos = "publicos";
    export var registrar = "registrar";
    export var user = "user";
    export var setNotif = "setNotif";
    export var AddFriend = "AddFriend";
    export var listaGrupos = "listaGrupos";

    /*Direciones de las notas*/
    export var getSpecificNotes = "getSpecificNotes";
    export var deleteNota = "deleteNota";
    export var nuevaNota = "nuevaNota";
    export var nuevaNotaTablero = "nuevaNotaTablero";

    /*Direccion de los mansajes*/
    export var getMensajes = "getMensajes";
    export var sendMsg = "sendMsg";
    export var getNotaChat = "getMsgChat";
    export var getParticipantes = "getParticipantes";
    export var getTablero = "getTablero";

    var baseUrl = "http://localhost:11111/api";
    //var baseUrl = "http://wcbackend.azurewebsites.net/api";
    /*if (DEBUG) {
        baseUrl = "http://localhost:55555/api";
    } else {
        baseUrl = "http://wcbackend.azurewebsites.net/api";
    }*/
    var urls: { [index: string]: string } = {}

    urls[getSpecificUser] = baseUrl + "/users";
    urls[getSpecificEvent] = baseUrl + "/events";
    urls[getEventosPendientes] = baseUrl + "/events/pendientes";
    urls[setSpecificEvent] = baseUrl + "/events";
    urls[getEventoInvitado] = baseUrl + "/events/invitacion";
    urls[deleteSpecificEvent] = baseUrl + "/events";
    urls[postSpecificEvent] = baseUrl + "/events";
    urls[cancelarEvento] = baseUrl + "/events/cancelarEvento/";
    urls[shareEvent] = baseUrl + "/events/share";
    urls[editEvent] = baseUrl + "/events/";
    urls[eliminarEvento] = baseUrl + "/events/";
    urls[getFriends] = baseUrl + "/Users/amigos";
    urls[eliminarInvitacion] = baseUrl + "/events/anularInvitacion/";
    urls[aceptarInvitacion] = baseUrl + "/events/aceptarInvitacion/";
    urls[getSpecificNotes] = baseUrl + "/Notas";
    urls[deleteNota] = baseUrl + "/Notas/";
    urls[nuevaNota] = baseUrl + "/Notas";
    urls[login] = baseUrl + "/Users/login";
    urls[token] = baseUrl + "/Users/token";
    urls[getMensajes] = baseUrl + "/Chat";
    urls[sendMsg] = baseUrl + "/Chat";
    urls[getNotaChat] = baseUrl + "/Notas/grupo";
    urls[nuevaNotaTablero] = baseUrl + "/Notas/tablero";
    urls[publicos] = baseUrl + "/events/publicos";
    urls[getParticipantes] = baseUrl + "/Chat/participantes";
    urls[registrar] = baseUrl + "/Users";
    urls[user] = baseUrl + "/Users/get";
    urls[setNotif] = baseUrl + "/Users/notification";
    urls[AddFriend] = baseUrl + "/Users/addFriend";
    urls[listaGrupos] = baseUrl + "/Chat/grupos";
    urls[getTablero] = baseUrl + "/Chat/tableros";

    export function getApiUrl(arg : string) {
        return urls[arg];
    }
}
