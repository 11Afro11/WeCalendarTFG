

export module ApiUrlRepository {
    export var getSpecificUser = "getSpecificUser";
    export var getSpecificEvent = "getSpecificEvent";
    export var setSpecificEvent = "setSpecificEvent";
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

    

    export function getApiUrl(arg : string) {
        return urls[arg];
    }
}
