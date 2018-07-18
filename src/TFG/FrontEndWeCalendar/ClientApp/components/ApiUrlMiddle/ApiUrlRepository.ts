﻿

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

    var baseUrl = "http://localhost:55555/api";
    /*if (DEBUG) {
        baseUrl = "http://localhost:55555/api";
    } else {
        baseUrl = "http://wcbackend.azurewebsites.net/api";
    }*/
    var urls: { [index: string]: string } = {}

    urls[getSpecificUser] = baseUrl + "/users";
    urls[getSpecificEvent] = baseUrl + "/events";
    urls[getEventosPendientes] = baseUrl + "pendientes";
    urls[setSpecificEvent] = baseUrl + "/events";
    urls[getEventoInvitado] = baseUrl + "/events/invitacion";
    urls[deleteSpecificEvent] = baseUrl + "/events";
    urls[postSpecificEvent] = baseUrl + "/events";
    urls[cancelarEvento] = baseUrl + "/events/cancelarEvento/";
    urls[shareEvent] = baseUrl + "/events/share";
    urls[editEvent] = baseUrl + "/events/";
    urls[eliminarEvento] = baseUrl + "/events/";
    urls[getFriends] = baseUrl + "/Users/amigos";

    export function getApiUrl(arg : string) {
        return urls[arg];
    }
}
