

export module ApiUrlRepository {
    export var getSpecificUser = "getSpecificUser";
    export var getSpecificEvent = "getSpecificEvent";
    export var setSpecificEvent = "setSpecificEvent";
    export var getEventoInvitado = "getEventoInvitado";
    export var deleteSpecificEvent = "deleteSpecificEvent";
    var baseUrl = "http://localhost:55555/api";
    /*if (DEBUG) {
        baseUrl = "http://localhost:55555/api";
    } else {
        baseUrl = "http://wcbackend.azurewebsites.net/api";
    }*/
    var urls: { [index: string]: string } = {}

    urls[getSpecificUser] = baseUrl + "/users";
    urls[getSpecificEvent] = baseUrl + "/events";
    urls[setSpecificEvent] = baseUrl + "/events";
    urls[getEventoInvitado] = baseUrl + "/events/invitacion";
    urls[deleteSpecificEvent] = baseUrl + "/events";

    

    export function getApiUrl(arg : string) {
        return urls[arg];
    }
}
